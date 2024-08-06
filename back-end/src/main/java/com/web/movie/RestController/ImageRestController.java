package com.web.movie.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
@RestController
@RequestMapping("/api/v1/resource")
public class ImageRestController {
    @Value("${file.upload-dir}")
    private String uploadDir;
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        try {
            Path path = Paths.get(uploadDir+"/" + filename);
            byte[] imageBytes = Files.readAllBytes(path);
    
            ByteArrayResource resource = new ByteArrayResource(imageBytes);
    
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Thay đổi loại MIME nếu cần
                    .contentLength(imageBytes.length)
                    .body(resource);
            
        } catch (Exception e) {
           return ResponseEntity.internalServerError().body(null);
        }
    }
    @GetMapping("/video/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename) throws IOException {
        try {
            Path path = Paths.get(uploadDir+"/" + filename);
            byte[] videoBytes = Files.readAllBytes(path);
    
            ByteArrayResource resource = new ByteArrayResource(videoBytes);
    
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf("video/mp4")) // Thay đổi loại MIME nếu cần
                    .contentLength(videoBytes.length)
                    .body(resource);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
