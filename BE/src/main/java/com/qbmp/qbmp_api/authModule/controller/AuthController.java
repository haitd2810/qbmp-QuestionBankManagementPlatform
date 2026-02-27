package com.qbmp.qbmp_api.authModule.controller;

import com.qbmp.qbmp_api.authModule.dto.response.AuthResponse;
import com.qbmp.qbmp_api.authModule.services.AuthService;
import com.qbmp.qbmp_api.common.dto.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse<AuthResponse>> login(@RequestHeader("Authorization") String header){
        String idToken = header.substring(7);
        var response = authService.authenticate(idToken);
        return ResponseEntity.ok(
                APIResponse.success(200, response, "login successfully!")
        );
    }
}
