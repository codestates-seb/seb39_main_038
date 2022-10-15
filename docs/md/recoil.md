# 리코일 사용법

## 설정 방법

- 최상단의 루트 js 파일에 `<RecoilRoot>`를 부모 컴포넌트로 설정한다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
```

## Atoms

- 데이터를 오직 하나의 출저에서만 생성 또는 편집할 수 있게 한다.
- 각각의 데이터 저장 공간이다.
- 고유한 `key`가 필요하며 `default`값도 필요하다.
- 저장 공간이므로 `getter` `setter` 등 상호 작용을 위한 Hooks가 recoil에 내장 되어있다.

### 사용 방법

```javascript
import { atom } from "recoil";
// 스토어를 등록하는 방법
const userStore = atom({ key: "users", default: [] });
```

<div style="page-break-after: always;"></div>

### 스토어의 데이터를 가져오고 수정하는 방법

- recoil의 내장 hook인 useRecoilState을 사용한다.
- React Hook인 useState와 동일하게 작동한다.

```javascript
import React from "react";
import { atom, useRecoilState } from "recoil";

// 스토어를 등록한다.
const userStore = atom({ key: "users", default: [] });

function App() {
  /* 
    useState와 동일하게 작동한다.
    배열의 첫 번째 요소는 getter이며 두 번째 요소는 setter이다. 
  */
  const [users, setUsers] = useRecoilState(userStore);
  const handleOnSummit = (e) => {
    e.preventDefault();
    const { user } = e.target;
    // 유저 정보를 추가한다.
    setUsers([...users, user.value]);
  };

  return (
    <React.Fragment>
      <div>{users}</div>
      <form onSubmit={handleOnSummit}>
        <input name="user" type="text" />
        <button type="submit">추가완료</button>
      </form>
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

### getter와 setter를 따로 사용하기

- 리코일의 장점은 `getter`와 `setter`가 컴포넌트에서 모두 사용되지 않는다면 부분적으로 불러와서 사용이 가능하다.

```javascript
import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const userStore = atom({ key: "users", default: [] });

function App() {
  /* 
    2가지로 hooks가 나눠져 있기 때문에 
    단독으로 쓰이는 컴포넌트에서는 이런식으로 개별 사용이 가능하다.
  */
  const users = useRecoilValue(userStore);
  const setUsers = useSetRecoilState(userStore);

  const handleOnSummit = (e) => {
    e.preventDefault();
    const { user } = e.target;
    setUsers([...users, user.value]);
  };

  return (
    <React.Fragment>
      <div>{users}</div>
      <form onSubmit={handleOnSummit}>
        <input name="user" type="text" />
        <button type="submit">추가완료</button>
      </form>
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

## Selectors

- 공식문서에서는 파생된 상태의 일부라고 정의한다.
- 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물이다.
- 쉽게 생각하면 여러개의 atom을 정제하여 하나의 다른 스토어를 만들 수 있다.

### Selector의 getter의 값을 생성하기

- selector의 get 프로퍼티를 사용한다.
- 파라미터에는 get에 사용하는 옵션 객체들이 포함되어 있다.
- 옵션 객체 중 `get` 함수를 사용하면 atom의 저장된 값을 가져올 수 있다.
- get 프로퍼티의 return 값이 selector의 `getter`의 값이 된다.

```javascript
import React from "react";
import { atom, selector, useRecoilState } from "recoil";

const animalStore = atom({
  key: "animlas",
  default: [
    { name: "lion", count: 2 },
    { name: "tiger", count: 10 },
    { name: "elephant", count: 4 },
  ],
});

const trainerStore = atom({
  key: "trainers",
  default: [
    {
      name: "YHJ",
      age: 24,
    },
    {
      name: "HGD",
      age: 30,
    },
    {
      name: "HSB",
      age: 44,
    },
  ],
});

const zooStore = selector({
  key: "zoo",
  get: ({ get }) => {
    // 내장된 get 함수를 이용해서 스토어의 값을 가져온다.
    const animals = get(animalStore);
    const trainers = get(trainerStore);
    // return 된 값이 selector의 값이 된다.
    return { animals, trainers };
  },
});

function App() {
  // 2개의 스토어를 합쳐서 zoo라는 selector를 생성한다.
  const [zoo] = useRecoilState(zooStore);
  return (
    <React.Fragment>
      <div>
        {zoo.animals.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
      <div>
        {zoo.trainers.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

### Selector의 setter 파라미터를 알아보기

- Selector의 set 프로퍼티를 사용한다.
- 첫 번째 파라미터에는 set에 사용하는 옵션 객체들이 포함되어 있다.
- 두 번째 파라미터부터 Selector의 `setter`에 넣어준 파라미터들이 들어온다.

```javascript
import React from "react";
import { atom, selector, useRecoilState } from "recoil";

const animalStore = atom({
  key: "animlas",
  default: [
    { name: "lion", count: 2 },
    { name: "tiger", count: 10 },
    { name: "elephant", count: 4 },
  ],
});

const trainerStore = atom({
  key: "trainers",
  default: [
    {
      name: "YHJ",
      age: 24,
    },
    {
      name: "HGD",
      age: 30,
    },
    {
      name: "HSB",
      age: 44,
    },
  ],
});

const zooStore = selector({
  key: "zoo",
  get: ({ get }) => {
    const animals = get(animalStore);
    const trainers = get(trainerStore);
    return { animals, trainers };
  },
  set: ({ set }, parms) => {
    // 결과 : { type: 'animals', value: { name: 'camel', count: 10 } }
    console.log(parms);
  },
});

<div style="page-break-after: always;"></div>;

function App() {
  const [zoo, setZoo] = useRecoilState(zooStore);

  const handleOnClick = () => {
    // selector의 두 번째 요소에 들어가게 된다.
    setZoo({ type: "animals", value: { name: "camel", count: 10 } });
  };

  return (
    <React.Fragment>
      <button onClick={handleOnClick}>클릭</button>
      <div>
        {zoo.animals.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
      <div>
        {zoo.trainers.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

### setter 파라미터를 이용해서 분기 처리하기

```javascript
const zooStore = selector({
  key: "zoo",
  get: ({ get }) => {
    const animals = get(animalStore);
    const trainers = get(trainerStore);
    return { animals, trainers };
  },
  set: ({ set, get }, parms) => {
    // get으로 해당 스토어의 값을 가져오기
    const animals = get(animalStore);
    const trainers = get(trainerStore);
    // 분기처리
    if (parms.type === "animals") set(animalStore, [...animals, parms.value]);
    if (parms.type === "trainers")
      set(trainerStore, [...trainers, parms.value]);
  },
});
```

```javascript
const [zoo, setZoo] = useRecoilState(zooStore);
// 클릭 이벤트로 제어가 가능하다.
const handleOnClick = () => {
  setZoo({ type: "animals", value: { name: "camel", count: 10 } });
};
```

<div style="page-break-after: always;"></div>

## 비동기 데이터 관리하는 방법

### 🔥 필독 🔥

**프로젝트에서는 React-Query로 비동기 데이터를 관리하나 React-Query 러닝커브로 인해 사용이 어려워질 경우 Recoil 비동기 데이터 관리를 위해 작성하였으며 useRecoilValueLoadable 방식이 아닌 `<React.Suspense>` 방식으로 진행합니다.**

- selector를 이용해서 관리한다.
- React.Suspense를 이용해서 관리할 수 있다.

### 비동기 데이터 가져오기 (useRecoilValueLoadable)

- useRecoilValueLoadable를 이용해서 관리 할 수 있다.
- state와, contents의 프로퍼티가 있다.
- state는 `loading`, `hasError`, `hasValue` 상태가 있으며 각 상황에 맞게 예외처리가 가능하다.
- `contents`는 해당 selector의 `getter`의 값이 할당된다.

```javascript
import axios from "axios";
import React from "react";
import { selector, useRecoilValueLoadable } from "recoil";

const API = "http://localhost:8080/animals";

const animalStore = selector({
  key: "animals",
  // async - await으로 비동기 데이터들을 반환해준다.
  get: async () => {
    const response = await axios.get(API);
    return response.data;
  },
});

function App() {
  const { state, contents } = useRecoilValueLoadable(animalStore);
  // 예외 처리
  if (state === "loading") return <div>...로딩중</div>;
  if (state === "hasError") return <div>Error</div>;
  return (
    <React.Fragment>
      {contents.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

### 비동기 데이터 가져오기 (React.Suspense)

- 랜더링 하고자 하는 컴포넌트 상단에 `<React.Suspense>`를 부모 컴포넌트로 지정한다.
- `<React.Suspense>`의 fallback 프로퍼티는 비동기 동작중에 보여줄 인터페이스를 지정할 수 있다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <RecoilRoot>
    {/* 리액트에 내장되어 있는 기능이다. React v18에서 정식 옵션 채택 */}
    <React.Suspense fallback={<div>...준비중</div>}>
      <App />
    </React.Suspense>
  </RecoilRoot>
);
```

```javascript
import axios from "axios";
import React from "react";
import { selector, useRecoilValue } from "recoil";

const API = "http://localhost:8080/animals";

const animalStore = selector({
  key: "animals",
  get: async () => {
    const response = await axios.get(API);
    return response.data;
  },
});

function App() {
  // 동기적으로 사용할 떄와 똑같이 useRecoilValue를 사용할 수 있다.
  const animals = useRecoilValue(animalStore);

  return (
    <React.Fragment>
      {animals.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

### 비동기 데이터 갱신하기

- useRecoilRefresher_UNSTABLE를 사용한다.
- 아직 정식 기능은 아니지만 프로젝트의 편의성을 위해서 사용합니다.
- atom 트리거를 만들거나 useRecoilCallback를 사용하는 방법도 있지만 useRecoilRefresher_UNSTABLE이 더욱 간단하다.

```javascript
import axios from "axios";
import React from "react";
import { selector, useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";

const API = "http://localhost:8080/animals";

const animalStore = selector({
  key: "animals",
  get: async () => {
    const response = await axios.get(API);
    return response.data;
  },
});

function App() {
  const animals = useRecoilValue(animalStore);
  // refreshAnimals를 호출하여 selector를 갱신한다.
  const refreshAnimals = useRecoilRefresher_UNSTABLE(animalStore);

  const postAnimal = (data) => async () => {
    await axios.post(API, data);
    refreshAnimals();
  };

  return (
    <React.Fragment>
      <button onClick={postAnimal({ name: "lion", count: 10 })}>전송</button>
      {animals.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </React.Fragment>
  );
}

export default App;
```

<div style="page-break-after: always;"></div>

## Atoms Effects 프로퍼티

### 🔥 필독 🔥

**스토리지를 관리하는 함수를 만들게된 과정을 설명했습니다. 나중에 스토리지 사용할 일이 있으면 로직을 참고해주세요.**

- React Hook의 useEffect 처럼 부수효과를 관리한다.
- 배열의 형태로 입력을 받으며 배열의 순서대로 함수를 실행한다.

```javascript
const userStore = atom({
  key: "users",
  default: [],
  // 앞에서 부터 순서대로 함수를 실행한다.
  effects: [callback1, callback2],
});
```

<div style="page-break-after: always;"></div>

### AtomEffect로 스토리지 관리하는 방법

- 내장 메소드인 setSelf와 onSet을 사용한다.
- setSelf는 atom의 default 값을 변경한다.
- onSet의 첫 번재 요소는 해당 스토어의 `setter`의 변경할 값을 요소로 받는다.

```javascript
import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const callback = ({ setSelf, onSet }) => {
  // 로컬 스토리지의 값이 있으면 default의 값을 로컬 스토리지의 값으로 변경한다.
  if (localStorage.getItem("users"))
    setSelf(JSON.parse(localStorage.getItem("users")));
  /* 
    setter가 작동되면 해당 요소를 첫 번째 요소로 가지고 있는 함수이며
    해당 요소를 스토리지에 등록한다.
  */
  onSet((value) => {
    localStorage.setItem("users", JSON.stringify(value));
  });
};

const userStore = atom({ key: "users", default: [], effects: [callback] });

function App() {
  const users = useRecoilValue(userStore);
  const setUsers = useSetRecoilState(userStore);

  const handleOnSummit = (e) => {
    e.preventDefault();
    const { user } = e.target;
    // setUsers의 파라미터가 onSet의 첫 번째 파라미터이다.
    setUsers([...users, user.value]);
  };

  return (
    <React.Fragment>
      <div>{users}</div>
      <form onSubmit={handleOnSummit}>
        <input name="user" type="text" />
        <button type="submit">추가완료</button>
      </form>
    </React.Fragment>
  );
}

export default App;
```
