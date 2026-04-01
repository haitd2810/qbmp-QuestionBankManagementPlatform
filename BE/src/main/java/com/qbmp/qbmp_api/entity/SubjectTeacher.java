package com.qbmp.qbmp_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "subject_teacher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectTeacher {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "SubjectTeacherId", updatable = false, nullable = false)
    private String subjectTeacherId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SubjectId", referencedColumnName = "SubjectId")
    private Subject subjects;

    @Column(name = "UserId")
    private String userId;

    @Column(name = "IsSubjectLeader")
    private boolean isSubjectLeader;

    @Column(name = "AssignDate")
    private LocalDate assignDate;
}
