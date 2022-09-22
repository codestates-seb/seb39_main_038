import React from 'react';
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

function DetailReview() {
  return (
    <Section>
      <Rating>
        <TotalRate>5.0</TotalRate> <span>★★★★★</span>
      </Rating>
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
        <OrderHistory>주문내역</OrderHistory>
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
