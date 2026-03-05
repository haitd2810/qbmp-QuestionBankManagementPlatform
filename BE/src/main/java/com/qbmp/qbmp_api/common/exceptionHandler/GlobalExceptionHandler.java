package com.qbmp.qbmp_api.common.exceptionHandler;

import com.qbmp.qbmp_api.common.dto.APIResponse;
import com.qbmp.qbmp_api.common.exception.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<APIResponse<Object>> handleAppException(AppException ex){
        APIResponse<Object> response = APIResponse.error(
                ex.getStatus(),
                ex.getMessage(),
                ex.getErrors(),
                ex.getCode()
        );
        return ResponseEntity.status(ex.getStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse<Object>> handleGeneralException(Exception ex) {
        APIResponse<Object> response = APIResponse.error(500, "Internal Server Error", ex.getMessage(), 9999);
        return ResponseEntity.status(500).body(response);
    }
}
