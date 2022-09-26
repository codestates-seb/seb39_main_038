package com.main_39.Spring.member.controller;

import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.member.dto.KakaoDto;
import com.main_39.Spring.member.dto.KakaoProfile;
import com.main_39.Spring.member.dto.LocalDto;
import com.main_39.Spring.member.dto.OAuthToken;
import com.main_39.Spring.member.entity.Kakao;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.mapper.MemberMapper;
import com.main_39.Spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Controller
@Validated
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    //버튼 확인용(프론트엔드)
    @GetMapping("/login")
    public String login() {
        return "loginForm";
    }

    @GetMapping("/")
    public @ResponseBody String loginSuccess(Authentication authentication){
        System.out.println("인증 객체 : " + authentication);
        return "로그인 성공";
    }

    //로컬 회원 가입
    @PostMapping("/signup")
    public ResponseEntity LocalSignUp(@Valid @RequestBody LocalDto.Post postDto){
        Local local = memberMapper.localPostToLocal(postDto);

        // 1. 데이터베이스에 회원정보 저장
        Local posted = memberService.createLocal(local);

        // 2. 회원가입 정보 리턴
        LocalDto.postResponse response = memberMapper.localToLocalPostResponse(posted);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response),HttpStatus.CREATED
        );
    }

    // 로컬 로그인은 UsernamePasswordAuthenticationFilter가 처리 (url: POST /login(default))
    /*
    * 1. acess_token, refresh_token 생성
    * 2. refresh_token 회원 DB에 저장
    * 3. loacl_access_token, local_refresh_token 쿠키 전달
    */

    // 로컬 로그아웃은 Security에서 처리(ur: POST /logout)
    /*
    * loacl_access_token, local_refresh_token 삭제
    */


    @PostMapping("/kakao/logout")
    public ResponseEntity KakaoLogout(HttpServletRequest request, HttpServletResponse response){

        //토큰 불러 오기
        Cookie[] cookies = request.getCookies();

        Cookie access_cookie = null;
        Cookie refresh_cookie = null;
        String access_token = "";
        String refresh_token = "";


        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("kakao_access_token")) access_cookie = cookie;
                if(cookie.getName().equals("kakao_refresh_token")) refresh_cookie = cookie;
            }
        }

        if(access_cookie != null) access_token = access_cookie.getValue();
        if(refresh_cookie != null) refresh_token = refresh_cookie.getValue();

        //카카오에 로그아웃 요청 -> access_token, refresh_token 무효
        memberService.logoutKakao(access_token);


        //access_token 삭제
        ResponseCookie remove_access_cookie = ResponseCookie.from("kakao_access_token",access_token)
                .path("/")
                .domain(".deploymentprac38.tk")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(0)
                .build();
        response.setHeader("Set-Cookie", remove_access_cookie.toString());


        //refresh_token 삭제
        ResponseCookie remove_refresh_cookie = ResponseCookie.from("kakao_refresh_token",refresh_token)
                .path("/")
                .domain(".deploymentprac38.tk")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(0)
                .build();
        response.setHeader("Set-Cookie",remove_refresh_cookie.toString());


        return new ResponseEntity(HttpStatus.OK);
    }


    //프론트엔드로 code 전달 받으면 유저정보 저장, token 발송
    @PostMapping("/login/oauth2/code/kakao")
    public ResponseEntity kakaoCallback(@RequestBody KakaoDto.CodeDto code,
                                        HttpServletResponse response){ //Data를 리턴해주는 컨트롤러 함수

        System.out.println("Authentication 시작");

        //code -> 토큰
        OAuthToken oauthToken = memberService.getToken(code.getCode());
        //토큰 -> 사용자 정보
        KakaoProfile kakaoProfile = memberService.getKaKaoProfile(oauthToken);
        //profile -> entity
        Kakao kakao = memberMapper.kakaoProfileToKakao(kakaoProfile,oauthToken);

        //데이터 베이스에 회원 정보 저장
        Kakao posted = memberService.createKakao(kakao);

        //헤더에 access토큰,refresh토큰,id토큰(혹시 모름),만료시간 넣어 리턴

        //access_token 쿠키
        ResponseCookie access_cookie = ResponseCookie.from("kakao_access_token", oauthToken.getAccess_token())
                .path("/")
                .domain(".deploymentprac38.tk")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60)
                .build();
        response.addHeader("Set-Cookie", access_cookie.toString());

        //refresh_token 쿠키
        ResponseCookie refresh_cookie = ResponseCookie.from("kakao_refresh_token",oauthToken.getRefresh_token())
                .path("/")
                .domain(".deploymentprac38.tk")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60 * 24 * 30 * 2)
                .build();
        response.addHeader("Set-Cookie",refresh_cookie.toString());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 로컬 유저 아이디 찾기
     * */
    @PostMapping("/search/email")
    public ResponseEntity<SingleResponseDto<LocalDto.searchIdResponse>> localIdSearch(@RequestBody LocalDto.searchIdDto idDto){

        Local findLocal = memberService.verifyEmail(idDto.getName(), idDto.getPhoneNumber());
        LocalDto.searchIdResponse response = memberMapper.localToLocalDtoSearchIdResponse(findLocal);

        return new ResponseEntity<SingleResponseDto<LocalDto.searchIdResponse>>(
          new SingleResponseDto<LocalDto.searchIdResponse>(response),HttpStatus.OK
        );
    }

    /**
     * 로컬 유저 비밀번호 찾기
     * */
    @PostMapping("/search/password")
    public ResponseEntity<SingleResponseDto<LocalDto.searchPwResponse>> localPwSearch(@RequestBody LocalDto.searchPwDto pwDto){

        Local findLocal = memberService.verifyPassword(pwDto.getAccountEmail(), pwDto.getName(), pwDto.getPhoneNumber());
        LocalDto.searchPwResponse response = memberMapper.localToLocalDtoSearchPwResponse(findLocal);

        return new ResponseEntity<SingleResponseDto<LocalDto.searchPwResponse>>(
          new SingleResponseDto<LocalDto.searchPwResponse>(response),HttpStatus.OK
        );
    }

    /**
     * 카카오 마이페이지
     * */
    @PostMapping("/kakao/mypage")
    public ResponseEntity<SingleResponseDto<KakaoDto.response>> kakaoMypage(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        Cookie access_cookie = null;
        String access_token = "";
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("kakao_access_token")) access_cookie = cookie;
            }
        }

        if(access_cookie != null) access_token = access_cookie.getValue();

        Kakao kakao = memberService.getKakaoInfo(access_token);
        KakaoDto.response response = memberMapper.kakaoToKakaoDtoResponse(kakao);

        return new ResponseEntity<SingleResponseDto<KakaoDto.response>>(
                new SingleResponseDto<KakaoDto.response>(response), HttpStatus.OK);
    }

    /**
     * 로컬 마이페이지
     * */
    @PostMapping("/local/mypage")
    public ResponseEntity<SingleResponseDto<LocalDto.response>> localMypage(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        Cookie access_cookie = null;
        String access_token = "";
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("local_access_token")) access_cookie = cookie;
            }
        }
        if(access_cookie != null) access_token = access_cookie.getValue();

        Local local = memberService.getLocalInfo(access_token);
        LocalDto.response response = memberMapper.localToLocalDtoResponse(local);


        return new ResponseEntity<SingleResponseDto<LocalDto.response>>(
                new SingleResponseDto<LocalDto.response>(response), HttpStatus.OK
        );
    }

    /**
     * 마일리지 확인
     * */
    @GetMapping("/kakao/mileage/{kakao-id}")
    public ResponseEntity<SingleResponseDto<KakaoDto.mileageDto>> kakaoMileage(@PathVariable @Positive Long kakaoId){
        Kakao kakao = memberService.findVerifiedKakao(kakaoId);
        KakaoDto.mileageDto response = memberMapper.kakaoToKakaoDtoMileage(kakao);

        return new ResponseEntity<SingleResponseDto<KakaoDto.mileageDto>>(
                new SingleResponseDto<KakaoDto.mileageDto>(response),HttpStatus.OK
        );
    }
}
