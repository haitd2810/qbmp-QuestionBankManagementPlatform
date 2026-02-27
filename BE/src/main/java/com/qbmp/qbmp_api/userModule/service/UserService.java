package com.qbmp.qbmp_api.userModule.service;

import com.qbmp.qbmp_api.entity.Users;
import com.qbmp.qbmp_api.userModule.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final IUserRepository userRepository;

    public Users saveUser(Users data){
        return userRepository.save((data));
    }

    public Optional<Users> findByFirebaseId(String firebaseId){
        return userRepository.findByFirebaseId(firebaseId);
    }
}
