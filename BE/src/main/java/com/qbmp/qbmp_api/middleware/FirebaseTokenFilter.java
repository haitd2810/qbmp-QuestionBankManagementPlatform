package com.qbmp.qbmp_api.middleware;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.common.exception.AppException;
import com.qbmp.qbmp_api.common.message.ErrorMessage;
import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.userModule.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private HandlerExceptionResolver resolver;

    public FirebaseTokenFilter(
            @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver,
            @Lazy UserService userService
    ) {
        this.resolver = resolver;
        this.userService = userService;
    }

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
                Users user = userService.findByFirebaseId(uid)
                        .orElseThrow(() -> new AppException(401, ErrorMessage.AUTHEN_ERROR.getCode(), ErrorMessage.AUTHEN_ERROR.getMessage()));
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }catch(Exception ex){
                resolver.resolveException(request, response, null, new AppException(401, ErrorMessage.AUTHEN_ERROR.getCode(), ErrorMessage.AUTHEN_ERROR.getMessage()));
                return;
            }
        }else{
            resolver.resolveException(request, response, null, new AppException(401, ErrorMessage.AUTHEN_ERROR.getCode(), ErrorMessage.AUTHEN_ERROR.getMessage()));
            return;
        }
        filterChain.doFilter(request, response);
    }
}
