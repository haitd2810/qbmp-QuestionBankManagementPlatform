package com.qbmp.qbmp_api.contentModule.dtos.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Setter
@Getter
public class SubjectTeacherResponse {
    private List<SubjectResponse> subjects;
}
