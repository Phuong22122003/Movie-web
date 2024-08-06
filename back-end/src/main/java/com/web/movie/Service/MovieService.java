package com.web.movie.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.web.movie.CustomException.ImageException;
import com.web.movie.CustomException.VideoException;
import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.ResponseDetail;
import com.web.movie.Entity.Comment;
import com.web.movie.Entity.Movie;
import com.web.movie.Repository.CommentRepository;
import com.web.movie.Repository.MovieGenreRepository;
import com.web.movie.Repository.MovieRepository;

@Service
public class MovieService {
    @Autowired private MovieRepository movieRepository;
    @Autowired private CommentRepository commentRepository;
    @Autowired private MovieGenreRepository movieGenreRepository;
    @Autowired private FileService fileService;
    public List<Movie> findAllMovies(){
        return movieRepository.findAll();
    }
    public ResponseEntity<ResponseDetail> addMovie(MultipartFile image,MultipartFile video,Movie movie){
        ResponseDetail responseDetail = new ResponseDetail();
        String imagePath = null;
        String videoPath = null;
        try{
            imagePath = fileService.saveImage(image);
            videoPath = fileService.saveVideo(video);
        }
        catch (ImageException e){
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not save image because "+e.getMessage());
            return ResponseEntity.internalServerError().body(responseDetail);
        }
        catch(VideoException e){
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not save video because "+e.getMessage());
            fileService.deletImage(imagePath);
            return ResponseEntity.internalServerError().body(responseDetail);
        }
        catch(Exception e){
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not save video because "+e.getMessage());
            fileService.deletImage(imagePath);
            fileService.deletImage(videoPath);
            return ResponseEntity.internalServerError().body(responseDetail);
            
        }
        try{
            movie.setImagePath(imagePath);
            movie.setSource(videoPath);
            movie.setLength((int) video.getSize());
            movieRepository.save(movie);
        }
        catch(Exception ex){
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not save moive because "+ex.getMessage());
            fileService.deletImage(imagePath);
            fileService.deletImage(videoPath);
            return ResponseEntity.internalServerError().body(responseDetail);
        }
        responseDetail.setData(movie);
        responseDetail.setIsError(false);
        responseDetail.setMessage("Successfully");
        return ResponseEntity.ok().body(responseDetail);
    }
    public ResponseEntity<ResponseDetail> update(MultipartFile image, Movie movie){
        String preImagePath = movie.getImagePath();
        ResponseDetail responseDetail = new ResponseDetail();
        if(image!=null&&!image.isEmpty()){
            try{
                String imagePath = fileService.saveImage(image);
                movie.setImagePath(imagePath);
            }
            catch(Exception ex){
                responseDetail.setIsError(true);
                responseDetail.setMessage("Can not save image");
                return ResponseEntity.internalServerError().body(responseDetail);
            }
        }
        try {
            movieRepository.save(movie);
        } catch (Exception e) {
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not save moive");
            //previous image path
            fileService.deletImage(movie.getImagePath());
            return ResponseEntity.internalServerError().body(responseDetail);
        }
        if(image!=null&&!image.isEmpty()){
            fileService.deletImage(preImagePath);
        }
        responseDetail.setIsError(false);
        responseDetail.setMessage("Successfully");
        responseDetail.setData(movie);
        return ResponseEntity.ok().body(responseDetail);
    }
    public ResponseEntity<?> deleteMovie(Integer id){
        Movie movie = findMovieById(id);
        ResponseDetail responseDetail = new ResponseDetail();
        if(movie == null) {
            responseDetail.setIsError(true);
            responseDetail.setMessage("Movie is not in database");
            return ResponseEntity.status(404).body(responseDetail);
        }
        try{
            fileService.deletImage(movie.getImagePath());
            fileService.deletImage(movie.getSource());
            movieRepository.deleteById(id);
        }
        catch(Exception ex){
            responseDetail.setIsError(true);
            responseDetail.setMessage("Can not delete movie");
            return ResponseEntity.status(HttpStatusCode.valueOf(500)).body(responseDetail);
        }
        responseDetail.setIsError(false);
        responseDetail.setMessage("Successfully");
        return ResponseEntity.ok().body(responseDetail);
    }
    public List<Movie> findMovieByGenre(Integer genre,Integer id){
        List<Movie> listMovies;
        if(genre == 0) 
            listMovies = movieRepository.findAll();
        else
            listMovies = movieRepository.findMovieByGenre(genre);
        if(listMovies!=null&&id!=0)
            listMovies.removeIf(movie-> movie.getId()==id);
        return listMovies;
    }
    public Movie findMovieById(Integer id){
        return movieRepository.findMovieById(id);
    }

    public MovieDto getMovie(Integer id){
        Movie movie = findMovieById(id);
        List<Comment> comments = commentRepository.findCommentsByMovieId(id);
        MovieDto movieDto = new MovieDto();
        movieDto.setName(movie.getName());
        movieDto.setSource(movie.getSource());
        Integer genre = movieGenreRepository.findGenre(id);
        if(genre == null) genre =0;
        movieDto.setGenre(genre);
        movieDto.setListComment(comments);
        return movieDto;
    }

    public List<Movie> seachMovie(String keyword){
        List<Movie> movies = movieRepository.findAll();
        List<Movie> results = new ArrayList<>();

        movies.forEach((movie)->{
            if(movie.getName().trim().toUpperCase().contains(keyword.trim().toUpperCase())|| 
            keyword.trim().toUpperCase().contains(movie.getName().trim().toUpperCase())){
                results.add(movie);
            }
        });
        return results;
    }
}
