package com.qbmp.qbmp_api.authModule.repository;

import com.qbmp.qbmp_api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IAuthRepository  extends JpaRepository<Users, UUID> {
    boolean existsByFirebaseId(String firebaseId);
}
