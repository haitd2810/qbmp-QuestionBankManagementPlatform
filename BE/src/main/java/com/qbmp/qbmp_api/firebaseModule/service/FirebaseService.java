package com.qbmp.qbmp_api.firebaseModule.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.qbmp.qbmp_api.common.exception.AppException;
import com.qbmp.qbmp_api.common.message.ErrorMessage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FirebaseService {
    public FirebaseToken decodedToken(String token){
        try{
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            return decodedToken;
        }catch(FirebaseAuthException ex){
            throw new AppException(401, ErrorMessage.AUTHEN_ERROR.getCode(), ErrorMessage.AUTHEN_ERROR.getMessage());
        }
    }
}
