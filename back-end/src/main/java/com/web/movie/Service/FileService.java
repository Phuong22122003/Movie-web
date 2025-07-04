package com.web.movie.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.web.movie.CustomException.ImageException;
import com.web.movie.CustomException.VideoException;

@Service
public class FileService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveImage(MultipartFile image) throws ImageException{
        if (image.isEmpty()) {
            ImageException imageException = new ImageException("Image is empty");
            throw imageException;
        }

        try {
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }
            
            String name = Instant.now().getEpochSecond() +image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir).resolve(name);
            Files.write(filePath, image.getBytes());
            return  name;
        } catch (IOException e) {
            throw new ImageException("Fail to save Image: " +e.getMessage());
        }
    }
    public String saveVideo(MultipartFile video) throws VideoException{
        if (video.isEmpty()) {
            throw new VideoException("Video is empty");
        }

        try {
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }
            
            String name = Instant.now().getEpochSecond() +video.getOriginalFilename();
            Path filePath = Paths.get(uploadDir).resolve(name);
            Files.write(filePath, video.getBytes());
            return name;
        } catch (IOException e) {
            throw new VideoException("Fail to save video: " +e.getMessage());
        }
    }
    public Boolean deletImage(String name){
   
        Path path = null;
        try {
            path = Paths.get(uploadDir,name);
        } catch (Exception e) {
            return false;
        }        
        if(path!=null&&Files.exists(path)){
            try {
                Files.delete(path);
                return true;
            } catch (IOException e) {
                return false;
            }
        }
        
        return false;

        
    }
}
