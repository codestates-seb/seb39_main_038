import React from 'react';
import { useRecoilState } from 'recoil';
import { menuTab } from './atom';
import {
  MenuBar,
  TabBtn,
  Section,
  Menu,
  MenuInfo,
  MenuImg,
  Rating,
  Comment,
  NameDateReply,
  ReplyDeleteBtn,
  ThumnailBox,
  Thumnail,
} from './styles';

function DetailMenuBar() {
  const [menu, setMenu] = useRecoilState(menuTab);

  return (
    <Section>
      <MenuBar>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('메뉴');
          }}
        >
          메뉴 35
        </TabBtn>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('리뷰');
          }}
        >
          클린리뷰 1740
        </TabBtn>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('정보');
          }}
        >
          정보
        </TabBtn>
      </MenuBar>
      {menu === '메뉴' ? <DetailFoodMenu /> : null}
      {menu === '리뷰' ? <DetailReview /> : null}
      {menu === '정보' ? '정보' : null}
    </Section>
  );
}

function DetailFoodMenu() {
  return (
    <Section>
      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>
    </Section>
  );
}

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

export default DetailMenuBar;
