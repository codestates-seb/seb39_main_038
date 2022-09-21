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
  TruckInfoBody,
  TruckInfoTitle,
  TruckInfoContent,
  TruckInfoContentKey,
  TruckInfoContentValue,
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
      {menu === '정보' ? <DetailInfo /> : null}
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

function DetailInfo() {
  return (
    <TruckInfoBody>
      <TruckInfoTitle>사장님 알림</TruckInfoTitle>

      <TruckInfoContent>
        상단 찜 하트 꾸욱 눌러주세요. 리뷰 서비스 1당면추가 2음료
      </TruckInfoContent>

      <TruckInfoTitle>업체정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          영업시간: <TruckInfoContentValue>10:35 - 22:00</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          전화번호: <TruckInfoContentValue>010-1234-5678</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          주소:{' '}
          <TruckInfoContentValue>
            서울특별시 강동구 길동 377-3 오륜빌딩 1층 104호(길동, 오륜빌딩)
          </TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>결제정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          결제수단: <TruckInfoContentValue>카드, 현금</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>사업자정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          상호명: <TruckInfoContentValue>맘스터치</TruckInfoContentValue>
        </TruckInfoContentKey>
        <TruckInfoContentKey>
          사업자번호: <TruckInfoContentValue>7360701994</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>원산지정보</TruckInfoTitle>

      <TruckInfoContent>
        돼지고기(국내산),김치(국내산),쌀(국내산),고춧가루(국내산),바지락(국내산),새우(베트남),꽃게(중국산)두부(콩:미국산,중국산,캐나다산),콩나물(콩:중국산)
      </TruckInfoContent>
    </TruckInfoBody>
  );
}

export default DetailMenuBar;
