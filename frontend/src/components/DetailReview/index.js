import React from 'react';
import {
  Section,
  Rating,
  Comment,
  NameDateReply,
  ReplyDeleteBtn,
  ThumnailBox,
  Thumnail,
} from './styles';

function DetailReview() {
  return (
    <Section>
      <Rating>5.0 ★★★★★</Rating>
      <Comment>
        <NameDateReply>
          <span>김재원 2022-09-20</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★</div>
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
          <span>김재원 2022-09-21</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★★★</div>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>맛은 없는거 같아요...</div>
      </Comment>
      <Comment>
        <NameDateReply>
          <span>김재원 2022-09-20</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★</div>
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
          <span>김재원 2022-09-21</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★★★</div>
        <ThumnailBox>
          <Thumnail alt="Thumnail" />
        </ThumnailBox>
        <div>주문내역</div>
        <div>맛은 없는거 같아요...</div>
      </Comment>
      <Comment>
        <NameDateReply>
          <span>김재원 2022-09-20</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★</div>
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
          <span>김재원 2022-09-21</span>
          <div>
            <ReplyDeleteBtn type="button">답글</ReplyDeleteBtn>
            <ReplyDeleteBtn type="button">삭제</ReplyDeleteBtn>
          </div>
        </NameDateReply>
        <div>별점 ★★★★</div>
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
