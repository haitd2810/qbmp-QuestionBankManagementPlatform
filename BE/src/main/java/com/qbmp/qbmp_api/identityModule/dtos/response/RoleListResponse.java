package com.qbmp.qbmp_api.identityModule.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoleListResponse {
    private List<RoleResponse> roles;
}
