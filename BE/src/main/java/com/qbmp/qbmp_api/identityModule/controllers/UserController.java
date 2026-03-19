package com.qbmp.qbmp_api.identityModule.controllers;

import com.qbmp.qbmp_api.common.dto.APIResponse;
import com.qbmp.qbmp_api.identityModule.dtos.response.RoleListResponse;
import com.qbmp.qbmp_api.identityModule.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final RoleService roleService;
    @GetMapping("/roles")
    public ResponseEntity<APIResponse<RoleListResponse>> GetRoles(){
        RoleListResponse response = roleService.getAvailableRoles();
        return ResponseEntity.ok(
                APIResponse.success(200, response, "Get role successfully!")
        );
    }
}
