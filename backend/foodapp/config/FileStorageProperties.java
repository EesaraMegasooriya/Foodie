package com.example.foodapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Binds to properties prefixed with "file."
 * Make sure you have file.uploadDir set in application.properties.
 */
@Component
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    /** Directory where uploaded files will be stored */
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}
