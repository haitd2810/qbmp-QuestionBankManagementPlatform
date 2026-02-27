package com.qbmp.qbmp_api.userModule.repository;

import com.qbmp.qbmp_api.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserRepository extends JpaRepository<Users, UUID> {
    Optional<Users> findByFirebaseId(String firebaseId);
}
