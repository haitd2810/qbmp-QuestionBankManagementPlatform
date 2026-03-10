package com.qbmp.qbmp_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "RoleId", nullable = false)
    private String roleId;

    @Column(name = "RoleName")
    private String roleName;

    @Column(name = "priority")
    private int priority;
}
