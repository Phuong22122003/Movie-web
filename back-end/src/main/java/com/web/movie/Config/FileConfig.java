package com.web.movie.Config;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class FileConfig {
    @Value("${file.upload-dir}")
    private String folderPath;

    @PostConstruct
    public void init() {
        File folder = new File(folderPath);
        if (!folder.exists()) {
            boolean created = folder.mkdirs();
            if (created) {
                System.out.println("Folder created: " + folder.getAbsolutePath());
            } else {
                System.err.println("Failed to create folder: " + folder.getAbsolutePath());
            }
        } else {
            System.out.println("Folder already exists: " + folder.getAbsolutePath());
        }
    }
}
