// import React from 'react';
// import { useRecoilState } from 'recoil';
// import { atoms } from '../../store';
// import {
//   Section,
//   MainBody,
//   FoodTruckName,
//   FoodTruckCapsulizedInfo,
//   FoodTruckImg,
//   CapsulizedInfo,
//   Notice,
//   MenuBar,
//   ReviewTabBtn,
//   InfoTabBtn,
//   MenuTabBtn,
//   MenuSection,
// } from './styles';
// import {
//   DetailFoodList,
//   DetailInfo,
//   DetailReview,
//   Receipt,
// } from '../../components';
// // import FoodTruckSetting from '../FoodTruckSetting';

// function FoodDetail() {
//   const [menu, setMenu] = useRecoilState(atoms.menuTab);

//   return (
//     <Section>
//       <MainBody>
//         <FoodTruckName>
//           <div>맘스터치</div>
//         </FoodTruckName>
//         <FoodTruckCapsulizedInfo>
//           <FoodTruckImg>
//             <img alt="FoodTruckImg" />
//           </FoodTruckImg>

//           <CapsulizedInfo>
//             <span>별점</span>
//             <span>대기줄 시간</span>
//             <span>정보</span>
//           </CapsulizedInfo>
//         </FoodTruckCapsulizedInfo>
//         <Notice className="Notice">
//           <div>사장님의 알림</div>
//         </Notice>
//         <MenuSection>
//           <MenuBar>
//             <MenuTabBtn
//               menu={menu}
//               type="button"
//               onClick={() => {
//                 setMenu('메뉴');
//               }}
//             >
//               메뉴 35
//             </MenuTabBtn>
//             <ReviewTabBtn
//               menu={menu}
//               type="button"
//               onClick={() => {
//                 setMenu('리뷰');
//               }}
//             >
//               클린리뷰 1740
//             </ReviewTabBtn>
//             <InfoTabBtn
//               menu={menu}
//               type="button"
//               onClick={() => {
//                 setMenu('정보');
//               }}
//             >
//               정보
//             </InfoTabBtn>
//           </MenuBar>
//           {menu === '메뉴' ? <DetailFoodList /> : null}
//           {menu === '리뷰' ? <DetailReview /> : null}
//           {menu === '정보' ? <DetailInfo /> : null}
//         </MenuSection>
//       </MainBody>
//       <Receipt />
//       {/* <FoodTruckSetting /> */}
//     </Section>
//   );
// }

// export default FoodDetail;
