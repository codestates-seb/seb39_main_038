# 리액트 쿼리 사용법

## 설정 방법

- 최상단의 루트 js 파일에 `<QueryClientProvider>`를 부모 컴포넌트로 설정한다.
- `QueryClient`의 인스턴스를 생성하여 `QueryClientProvider`의 client 프로퍼티로 제공한다.
- `<ReactQueryDevtools>`는 Devtool을 제공하며 디버깅을 쉽게 할 수 있도록 도와준다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.getElementById("root");
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
  </QueryClientProvider>
);
```

### 데이터 가져오기 (분기처리)

- `useQuery`를 사용한다.
- 첫 번째 요소에는 배열에 문자열을 넣어서 키값을 지정한다.
- 두 번째 요소에는 `get` query의 데이터를 지정할 함수를 지정한다. (`queryFn`)
- data 프로퍼티에 통신 성공 데이터들이 저장되어 있다.
- 상태를 나타내는 프로퍼티는 isLoading, isError으로 예외처리를 할 수 있다.

```javascript
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API = "http://localhost:8080/animal";

const fetchAnimals = async () => {
  const response = await axios(API);
  return response;
};

function App() {
  const { data, isLoading, isError, error } = useQuery(
    ["animals"],
    fetchAnimals
  );

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      {data.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
```

### 데이터 가져오기 (React.Suspense)

- isLoding 프로퍼티로 예외처리 대신 리코일에서 사용하는 것과 같이 React.Suspense를 사용하면 쉽다.
- 최상단 루트 파일로 가서 QueryClient의 프로퍼티의 defaultOptions을 설정해야 한다.

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
```

```javascript
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API = "http://localhost:8080/animal";

const fetchAnimals = async () => {
  const response = await axios(API);
  return response;
};

function App() {
  // suspense를 사용하게 되면 코드가 간결해진다.
  const { data } = useQuery(["animals"], fetchAnimals);

  return (
    <div>
      {data.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
```

### 후속 처리

- 세 번째 요소에는 옵션을 설정할 수 있다.
- 후속 처리 메소드를 제공한다.
- onSuccess는 성공하면 실행하는 콜백함수이다.
- onError는 실패하면 성공하는 콜백함수이다.
- onSettled는 함수가 실행되면 무조건 실행되는 콜백함수이다.

```javascript
const { data } = useQuery(["animals"], fetchAnimals, {
  onSuccess: () => {
    // then
    console.log("success");
  },
  onError: () => {
    //  catch
    console.log("error");
  },
  onSettled: () => {
    // finally
    console.log("settled");
  },
});
```

## useMutation을 사용해서 데이터 수정하기

```javascript
import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchStudent = () => axios.get("/student");
const addStudent = (data) => axios.post("/student", data);

function ReactUseMutation() {
  // refetch를 위한 invalidateQueries를 사용하기 위해 가져온다.
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["students"], fetchStudent);

  // useMutation 이벤트 발생후 query 다시 가져오기
  const { mutate } = useMutation(addStudent, {
    onSuccess: () => {
      // 성공하면 쿼리키의 스토어를 refetch 한다.
      queryClient.invalidateQueries(["students"]);
    },
  });

  if (isLoading) return <div>Loding...</div>;

  const createList = () => {
    return data?.data.map((item) => {
      return (
        <li key={item.id}>
          <div>{item.name}</div>
          <div>{item.age}</div>
        </li>
      );
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, age } = e.target;
    // mutate의 넣어준 파라미터가 addStudent의 파라미터가 된다.
    mutate({ name: name.value, age: age.value });
    e.target.reset();
  };

  return (
    <>
      {createList()}
      <form onSubmit={handleOnSubmit}>
        <input name="name" placeholder="이름을 입력하세요." />
        <input name="age" placeholder="나이를 입력하세요" type="number" />
        <button type="submit">Click</button>
      </form>
    </>
  );
}

export default ReactUseMutation;
```

### 프로젝트에서 에러바운딩

- React.Suspense와 만들어논 ErrorBoundary 컴포넌트를 사용한다.
- 해당 에러 바운딩을 할 컴포넌트 바로 부모 컴포넌트에 사용한다.
- `ErrorBoundary` 컴포넌트를 `Suspense` 보다 부모 컴포넌트로 지정한다.
- `fallback` 프로퍼티에는 비동기 데이터가 올 경우 대기하는 시간동안 보여줄 컴포넌트를 넣어준다.

```javascript
<ErrorBoundary>
  <React.Suspense fallback={<Spinner color={COLOR.NAVY} size={50} />}>
    <Routes>
      <Route path={ROUTE.FOODLIST.FOODTRUCKS.PATH} element={<FoodTrucks />} />
      <Route path={ROUTE.FOODLIST.FOODDETAIL.PATH} element={<FoodDetail />} />
    </Routes>
  </React.Suspense>
</ErrorBoundary>
```
