package com.qbmp.qbmp_api.contentModule.dtos.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class SubjectResponse {
    private String subjectId;
    private String subjectCode;
    private String subjectName;
    private String description;
    private String role;
}
