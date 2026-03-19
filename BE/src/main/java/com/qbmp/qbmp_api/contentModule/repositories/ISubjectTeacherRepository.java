package com.qbmp.qbmp_api.contentModule.repositories;

import com.qbmp.qbmp_api.entity.SubjectTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ISubjectTeacherRepository extends JpaRepository<SubjectTeacher, UUID> {
    @Query("SELECT st FROM SubjectTeacher st JOIN FETCH st.subjects WHERE st.userId = :userId")
    List<SubjectTeacher> findAllByUserId(String userId);
}
