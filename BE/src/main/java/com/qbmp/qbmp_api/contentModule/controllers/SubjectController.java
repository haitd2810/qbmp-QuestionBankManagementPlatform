package com.qbmp.qbmp_api.contentModule.controllers;

import com.qbmp.qbmp_api.common.dto.APIResponse;
import com.qbmp.qbmp_api.contentModule.dtos.response.SubjectTeacherResponse;
import com.qbmp.qbmp_api.contentModule.services.SubjectTeacherServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class SubjectController {
    private final SubjectTeacherServices subjectTeacherServices;

    @GetMapping("/subjects")
    public ResponseEntity<APIResponse<SubjectTeacherResponse>> GetSubjects(){
        SubjectTeacherResponse response = subjectTeacherServices.findSubjectOfTeacher();
        System.out.println(response.getSubjects().size() + "===================");
        return ResponseEntity.ok(
                APIResponse.success(200, response, "Get subject successfully!")
        );
    }
}
