package com.qbmp.qbmp_api.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
public class AppException extends RuntimeException {
    private final int status;
    private final int code;
    private final Object errors;

    public AppException(int status, int code, Object errors) {
        super(errors != null ? errors.toString() : null);
        this.status = status;
        this.code = code;
        this.errors = errors;
    }
}
