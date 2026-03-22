package com.qbmp.qbmp_api.contentModule.services;

import com.qbmp.qbmp_api.contentModule.dtos.response.SubjectResponse;
import com.qbmp.qbmp_api.contentModule.dtos.response.SubjectTeacherResponse;
import com.qbmp.qbmp_api.contentModule.repositories.ISubjectTeacherRepository;
import com.qbmp.qbmp_api.entity.SubjectTeacher;
import com.qbmp.qbmp_api.entity.Users;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SubjectTeacherServices {
    private final ISubjectTeacherRepository subjectTeacherRepository;

    public List<SubjectResponse> findSubjectOfTeacher(){
        Users currentUser = (Users) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<SubjectTeacher> subjects = subjectTeacherRepository.findAllByUserId(currentUser.getUserId());

        List<SubjectResponse> subjectsResult = subjects.stream()
                .map(subject -> SubjectResponse.builder()
                        .subjectId(subject.getSubjects().getSubjectId())
                        .subjectName(subject.getSubjects().getSubjectName())
                        .subjectCode(subject.getSubjects().getSubjectCode())
                        .description(subject.getSubjects().getDescription())
                        .role(subject.isSubjectLeader() ? "leader" : "teacher").build()
                ).toList();

        return subjectsResult;
    }
}
