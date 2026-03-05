package com.qbmp.qbmp_api.authModule.services;

import com.qbmp.qbmp_api.authModule.dto.response.AuthResponse;
import com.qbmp.qbmp_api.authModule.repository.IAuthRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.common.exception.AppException;
import com.qbmp.qbmp_api.common.message.ErrorMessage;
import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.userModule.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final IAuthRepository authRepository;
    private final UserService userService;

    public AuthResponse authenticate(String token) {
        try{
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            boolean userExisted = authRepository.existsByFirebaseId(uid);
            Users user = userService.findByFirebaseId(uid)
                    .orElseGet(() -> {
                        Users newUser = new Users();
                        newUser.setFirebaseId(uid);
                        newUser.setFullname(decodedToken.getName());
                        newUser.setUserEmail(decodedToken.getEmail());
                        return userService.saveUser(newUser);
                    });
            AuthResponse response = new AuthResponse();
            response.setFullName(user.getFullname());
            return response;
        }catch(FirebaseAuthException ex){
            throw new AppException(401, ErrorMessage.AUTHEN_ERROR.getCode(), ErrorMessage.AUTHEN_ERROR.getMessage());
        }
    }

}
