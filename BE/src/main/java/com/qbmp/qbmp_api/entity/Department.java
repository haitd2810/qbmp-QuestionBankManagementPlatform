package com.qbmp.qbmp_api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "DepartmentId", updatable = false, nullable = false)
    private String departmentId;

    @Column(name = "DepartmentCode")
    private String departmentCode;

    @Column(name = "DepartmentName")
    private String departmentName;

    @Column(name = "Description")
    private String description;

    @CreationTimestamp
    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @Column(name = "DeleteFlag")
    private boolean deleteFlag;

    @OneToMany(mappedBy = "departments", cascade = CascadeType.ALL)
    private List<Subject> subjects;
}
