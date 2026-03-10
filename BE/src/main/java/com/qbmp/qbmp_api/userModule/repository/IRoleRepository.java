package com.qbmp.qbmp_api.userModule.repository;

import com.qbmp.qbmp_api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IRoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByRoleName(String roleName);
    @Query("SELECT r FROM Role r WHERE r.priority >= :priority ORDER BY r.priority ASC")
    List<Role> findAllAvailableRoles(@Param("priority") Integer priority);
}
