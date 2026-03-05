package com.qbmp.qbmp_api.middleware;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.common.dto.APIResponse;
import com.qbmp.qbmp_api.common.exception.AppException;
import com.qbmp.qbmp_api.common.message.ErrorMessage;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer ")){
            String idToken = header.substring(7);
            try{
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
                String uid = decodedToken.getUid();
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(uid, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }catch(FirebaseAuthException ex){
                // 1. Phải set Header CORS trước để trình duyệt không chặn
                response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                response.setHeader("Access-Control-Allow-Credentials", "true");

                // 2. Set trạng thái và nội dung lỗi
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                String jsonResponse = String.format(
                        "{\"code\":\"%s\", \"message\":\"%s\"}",
                        ErrorMessage.AUTHEN_ERROR.getCode(),
                        ErrorMessage.AUTHEN_ERROR.getMessage()
                );
                response.getWriter().write(jsonResponse);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
