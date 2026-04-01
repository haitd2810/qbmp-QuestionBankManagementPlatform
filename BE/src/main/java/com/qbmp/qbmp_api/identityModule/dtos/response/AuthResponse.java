package com.qbmp.qbmp_api.identityModule.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String fullName;
    private String role;
}
