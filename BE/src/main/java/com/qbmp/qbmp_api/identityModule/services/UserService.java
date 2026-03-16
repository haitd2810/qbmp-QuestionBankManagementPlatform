package com.qbmp.qbmp_api.identityModule.services;

import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.identityModule.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final IUserRepository userRepository;
    private final RoleService roleService;

    public Optional<Users> findByFirebaseId(String firebaseId){
        return userRepository.findByFirebaseId(firebaseId);
    }

    public Users getOrCreateUser(String firebaseId, FirebaseToken dataUsers){
        Users user = findByFirebaseId(firebaseId)
                .orElseGet(() -> {
                    Users newUser = new Users();
                    newUser.setFirebaseId(firebaseId);
                    newUser.setFullname(dataUsers.getName());
                    newUser.setUserEmail(dataUsers.getEmail());
                    roleService.findRoleByRoleName("teacher")
                            .ifPresent(role -> newUser.setRole(role));
                    return userRepository.save(newUser);
                });
        return user;
    }
}
