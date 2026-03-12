package com.qbmp.qbmp_api.userModule.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoleResponse {
    private String roleId;
    private String roleName;
}
