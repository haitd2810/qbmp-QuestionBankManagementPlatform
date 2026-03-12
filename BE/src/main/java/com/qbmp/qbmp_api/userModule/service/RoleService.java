package com.qbmp.qbmp_api.userModule.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.common.exception.AppException;
import com.qbmp.qbmp_api.common.message.ErrorMessage;
import com.qbmp.qbmp_api.entity.Role;
import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.userModule.dto.response.RoleListResponse;
import com.qbmp.qbmp_api.userModule.dto.response.RoleResponse;
import com.qbmp.qbmp_api.userModule.repository.IRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final IRoleRepository roleRepository;

    public Optional<Role> findRoleByRoleName(String roleName){
        return roleRepository.findByRoleName(roleName);
    }

    public RoleListResponse getAvailableRoles(){
        Users currentUser = (Users) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<Role> roles = roleRepository.findAllAvailableRoles(currentUser.getRole().getPriority());

        List<RoleResponse> roleResponse = roles.stream()
                .map(role -> RoleResponse.builder()
                        .roleId(role.getRoleId())
                        .roleName(role.getRoleName())
                        .build())
                .toList();

        return RoleListResponse.builder()
                .roles(roleResponse)
                .build();
    }
}
