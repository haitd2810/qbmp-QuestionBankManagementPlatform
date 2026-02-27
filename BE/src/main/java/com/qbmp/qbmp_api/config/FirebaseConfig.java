package com.qbmp.qbmp_api.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class FirebaseConfig {
    @Bean
    public FirebaseApp initializeFirebase() throws IOException{
        // 1. Lấy chuỗi JSON từ biến môi trường
        String path = System.getenv("FIREBASE_CONFIG_JSON");
        String firebaseConfig = Files.readString(Path.of(path));

        System.out.println("Nội dung nhận được: " + firebaseConfig);

        if(firebaseConfig == null || firebaseConfig.isEmpty()){
            throw new IllegalStateException("Firebase env is not exist!");
        }

        // 2. Chuyển chuỗi String thành InputStream
        InputStream serviceAccount = new ByteArrayInputStream(
                firebaseConfig.getBytes(StandardCharsets.UTF_8)
        );

        // 3. Khởi tạo Firebase Options
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // 4. Kiểm tra nếu App chưa được khởi tạo thì mới init (tránh lỗi duplicate)
        if(FirebaseApp.getApps().isEmpty()){
            return FirebaseApp.initializeApp(options);
        }

        return FirebaseApp.getInstance();
    }
}
