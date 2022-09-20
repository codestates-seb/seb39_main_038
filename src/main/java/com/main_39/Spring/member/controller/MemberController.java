package com.main_39.Spring.member.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.member.dto.CodeDto;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;

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
        Local posted = memberService.createLocal(local);

        LocalDto.postResponse response = memberMapper.localToLocalPostResponse(posted);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response),HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity LocalLogin(){
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity LocalLogout(){
        //Redis에 해당 토큰 BlackList 처리
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/kakao/logout")
    public ResponseEntity KakaoLogout(){
        //카카오에 로그아웃 요청 -> access_token, refresh_token 무효
        //Redis에 해당 토큰 BlackList 처리
        return new ResponseEntity(HttpStatus.OK);
    }


    //프론트엔드로 code 전달 받으면 유저정보 저장, token 발송
    @PostMapping("/login/oauth2/code/kakao")
    public ResponseEntity kakaoCallback(@RequestBody CodeDto codeDto,
                                        HttpServletResponse response){ //Data를 리턴해주는 컨트롤러 함수

        System.out.println("Authentication 시작");

        //code -> 토큰
        OAuthToken oauthToken = memberService.getToken(codeDto.getCode());
        //토큰 -> 사용자 정보
        KakaoProfile kakaoProfile = memberService.getKaKaoProfile(oauthToken);
        //profile -> entity
        Kakao kakao = memberMapper.kakaoProfileToKakao(kakaoProfile,oauthToken);

        //DB에 저장
        Kakao posted = memberService.createKakao(kakao);

        //헤더에 access토큰,refresh토큰,id토큰(혹시 모름),만료시간 넣어 리턴

        //access_token 쿠키
        ResponseCookie access_cookie = ResponseCookie.from("access_token", oauthToken.getAccess_token())
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .maxAge(60 * 60)
                .build();
        response.setHeader("Set-Cookie", access_cookie.toString());

        //refresh_token 쿠키
        ResponseCookie refresh_cookie = ResponseCookie.from("refresh_token",oauthToken.getRefresh_token())
                .path("/")
                .sameSite("None")
                .httpOnly(true)
                .maxAge(60 * 60 * 24 * 30 * 2)
                .build();
        response.setHeader("Set-Cookie",refresh_cookie.toString());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
