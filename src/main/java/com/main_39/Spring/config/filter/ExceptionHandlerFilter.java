package com.main_39.Spring.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main_39.Spring.advice.ErrorResponse;
import com.main_39.Spring.exception.BusinessLogicException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



/**
 * 필터에서 발생한 예외를 처리하는 예외 처리 필터
 * @author 유태형
 * @see org.springframework.web.filter.OncePerRequestFilter
 * */
@Slf4j
@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    /**
     * 필터에서 예외 발생 시 캐치해서 에러 클라이언트에게 리턴
     * */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        }catch(BusinessLogicException exception){
            System.out.println("인증, 인가 중 예외 발생");
            setErrorResponse(exception, response);
        }
    }

    /**
     * 예외를 클라이언트에게 리턴하는 메서드
     * */
    private void setErrorResponse(BusinessLogicException exception, HttpServletResponse response){
        response.setStatus(exception.getExceptionCode().getStatus());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ErrorResponse errorResponse = ErrorResponse.of(exception.getExceptionCode());
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            String json = objectMapper.writeValueAsString(errorResponse);
            response.getWriter().write(json);
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}
