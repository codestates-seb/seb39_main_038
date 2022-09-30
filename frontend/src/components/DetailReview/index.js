import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Spinner } from '../Spinner';
import {
  Section,
  Rating,
  TotalRate,
  Comment,
  NameDateReply,
  Date,
  Rate,
  ReplyDeleteBtn,
  ThumnailBox,
  OrderHistory,
  Thumnail,
} from './styles';

function ReviewList() {
  const queryClient = useQueryClient();

  const getReviewList = async () => {
    const res = await axios.get('/review');
    return res;
  };

  const { isLoading, isError, data, error } = useQuery(
    ['getReview'],
    getReviewList,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      retryDelay: 3000,

      onSuccess: () => {
        alert('리뷰 불러오기 성공');
        queryClient.invalidateQueries(['getReview']);
      },

      onError: (e) => {
        alert(e);
      },
    },
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return alert('리뷰 불러오기 실패', error);
  }

  return data.map((res) => (
    <Comment key={res.id}>
      <NameDateReply>
        <div>
          {res.name} <Date>{res.date}</Date>
        </div>
        <div>
          <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
          <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
        </div>
      </NameDateReply>
      <Rate>별점 {res.rate}</Rate>
      <ThumnailBox>
        <Thumnail alt="Thumnail" src={res.img} />
      </ThumnailBox>
      <OrderHistory>{res.history}</OrderHistory>
      <div>{res.content}</div>
    </Comment>
  ));
}

function DetailReview() {
  return (
    <Section>
      <Rating>
        <TotalRate>5.0</TotalRate> <span>★★★★★</span>
      </Rating>

      {ReviewList}

      <Comment>
        <NameDateReply>
          <div>
            김재원 <Date>2022-09-21</Date>
          </div>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <Rate>별점 ★★★★</Rate>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>맛은 없는거 같아요...</div>
      </Comment>
      <Comment>
        <NameDateReply>
          <div>
            김재원 <Date>2022-09-20</Date>
          </div>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <Rate>별점 ★★</Rate>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>
          사장님도 친절하시고, 양도 많고 엄청 신선했습니다! 많이 시켜먹을 것
          같습니다!
        </div>
      </Comment>
      <Comment>
        <NameDateReply>
          <div>
            김재원 <Date>2022-09-21</Date>
          </div>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <Rate>별점 ★★★★</Rate>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>맛은 없는거 같아요...</div>
      </Comment>
      <Comment>
        <NameDateReply>
          <div>
            김재원 <Date>2022-09-20</Date>
          </div>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <Rate>별점 ★★</Rate>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>
          사장님도 친절하시고, 양도 많고 엄청 신선했습니다! 많이 시켜먹을 것
          같습니다!
        </div>
      </Comment>
      <Comment>
        <NameDateReply>
          <div>
            김재원 <Date>2022-09-21</Date>
          </div>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <Rate>별점 ★★★★</Rate>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>맛은 없는거 같아요..</div>
      </Comment>
    </Section>
  );
}

export { DetailReview };
