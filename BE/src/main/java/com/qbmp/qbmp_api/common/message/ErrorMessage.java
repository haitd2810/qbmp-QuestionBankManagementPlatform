package com.qbmp.qbmp_api.common.message;

import lombok.Getter;

@Getter
public enum ErrorMessage {

    VALIDATION_ERROR(9999,"Validation failed"),
    AUTHEN_ERROR(101, "Authenticate failed");

    int code;
    String message;
    ErrorMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
