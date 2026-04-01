package com.qbmp.qbmp_api.contentModule.repositories;

import com.qbmp.qbmp_api.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ISubjectRepository extends JpaRepository<Subject, UUID> {
}
