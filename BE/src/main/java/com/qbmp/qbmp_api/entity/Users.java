package com.qbmp.qbmp_api.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "UserId", updatable = false, nullable = false)
    private String userId;

    @Column(name = "UserEmail", nullable = false, length = 255)
    private String userEmail;

    @Column(name = "FullName", nullable = false, length = 255)
    private String fullname;

    @Column(name = "RoleId", nullable = false)
    private String roleId;

    @Column(name = "Status", length = 8)
    private String status;

    @Column(name = "FirebaseId", nullable = false, length = 255)
    private String firebaseId;

    @Column(name = "ProfilePictureUrl")
    private String profilePictureUrl;

    @Column(name = "FeEmail")
    private String feEmail;

    @Column(name = "IsVerified")
    private boolean isVerified;

    @CreationTimestamp
    @Column(name = "CreateAt")
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "UpdateAt")
    private LocalDateTime updateAt;

}
