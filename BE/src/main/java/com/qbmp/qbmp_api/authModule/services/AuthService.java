package com.qbmp.qbmp_api.authModule.services;

import com.qbmp.qbmp_api.authModule.dto.response.AuthResponse;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.firebaseModule.service.FirebaseService;
import com.qbmp.qbmp_api.userModule.service.RoleService;
import com.qbmp.qbmp_api.userModule.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final FirebaseService firebaseService;
    private final UserService userService;

    public AuthResponse authenticate(String token) {
        FirebaseToken decodedToken = firebaseService.decodedToken(token);
        String uid = decodedToken.getUid();
        Users user = userService.getOrCreateUser(uid, decodedToken);
        AuthResponse response = AuthResponse.builder()
                .fullName(user.getFullname())
                .build();
        return response;
    }

}
