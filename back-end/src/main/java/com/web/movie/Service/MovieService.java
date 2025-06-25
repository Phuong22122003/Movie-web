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
import com.web.movie.Entity.Genre;
import com.web.movie.Entity.Movie;
import com.web.movie.Repository.CountryRepository;
import com.web.movie.Repository.GenreRepository;
import com.web.movie.Repository.MovieRepository;

@Service
public class MovieService {
    @Autowired private MovieRepository movieRepository;
    @Autowired private FileService fileService;
    @Autowired private GenreRepository genreRepository;
    @Autowired private CountryRepository countryRepository;
    @Autowired private SearchHelperService searchHelperService;
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
            movie.setImageFileName(imagePath);
            movie.setVideoFileName(videoPath);
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
        String preImageFilename = movie.getImageFileName();
        ResponseDetail responseDetail = new ResponseDetail();
        if(image!=null&&!image.isEmpty()){
            try{
                String imageName = fileService.saveImage(image);
                movie.setImageFileName(imageName);
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
            fileService.deletImage(movie.getImageFileName());
            return ResponseEntity.internalServerError().body(responseDetail);
        }
        if(image!=null&&!image.isEmpty()){
            fileService.deletImage(preImageFilename);
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
            fileService.deletImage(movie.getImageFileName());
            fileService.deletImage(movie.getVideoFileName());
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

    public Movie findMovieById(Integer id){
        return movieRepository.findById(id).get();
    }
    public MovieDto findMovieDetailById(Integer id){
        Movie movie = findMovieById(id);
        MovieDto movieDto = new MovieDto();
        movieDto.setName(movie.getName());
        movieDto.setSource(movie.getVideoFileName());
        movieDto.setListComment(movie.getComments());
        return movieDto;
    }
    public List<Movie> findMoviesByGenreID(Integer id){
        
        Genre genre = genreRepository.findById(id).get();
        if(genre == null) return null;
        List<Movie> listMovies = genre.getMovies();
        listMovies.removeIf(movie-> movie.getId()==id);
        return listMovies;
    }

    public List<Movie> findMoviesByCountry(String country){
        return countryRepository.findByName(country).getMovies();
    }
    public List<Movie> seachMovie(String keyword){
        List<Movie> movies = movieRepository.findAll();
        List<Movie> results = new ArrayList<>();

        movies.forEach((movie)->{
            if(searchHelperService.countNumberOfSameWords(keyword, movie.getName())>0||
            searchHelperService.countNumberOfSameWords(keyword, movie.getDescription())>0){
                results.add(movie);
            }
        });
        return results;
    }
}
