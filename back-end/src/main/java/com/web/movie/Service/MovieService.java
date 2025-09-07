package com.web.movie.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.web.movie.CustomException.NotFoundException;
import com.web.movie.Dto.MovieDto;
import com.web.movie.Dto.request.MovieRequestDto;
import com.web.movie.Entity.Country;
import com.web.movie.Entity.Genre;
import com.web.movie.Entity.Movie;
import com.web.movie.Repository.CountryRepository;
import com.web.movie.Repository.GenreRepository;
import com.web.movie.Repository.MovieRepository;
import com.web.movie.mapper.MovieMapper;

import jakarta.transaction.Transactional;

@Service
public class MovieService {
    @Autowired private MovieRepository movieRepository;
    @Autowired private FileService fileService;
    @Autowired private GenreRepository genreRepository;
    @Autowired private MovieMapper movieMapper;
    @Autowired private CountryRepository countryRepository;

    public List<Movie> findAllMovies(){
        return movieRepository.findAll();
    }

    public List<MovieDto> findMovies(int offset,int limit){
        List<Movie> movies = movieRepository.findAll(PageRequest.of(offset/limit, limit)).getContent();
        return movieMapper.toMovieDtos(movies);
    }

    @Transactional
    @CachePut(value="movies",key = "#result.id")
    public MovieDto addMovie(MultipartFile image, MultipartFile video, MovieRequestDto movieDto){
        String imagePath = null;
        String videoPath = null;
        try{
            imagePath = fileService.saveImage(image);
            videoPath = fileService.saveVideo(video);
        }
        catch(Exception e){
            
            fileService.deletImage(imagePath);
            fileService.deletImage(videoPath);
            throw new RuntimeException("Can not save file");
        }
        List<Genre> genres = null;
        Country country = null;
        if(movieDto.getGenreIds()!=null) genres = genreRepository.findAllById(movieDto.getGenreIds());
        if(movieDto.getCountryId()!=null) country = countryRepository.findById(movieDto.getCountryId()).get();
        Movie movie = movieMapper.toMovie(movieDto);
        movie.setImageFileName(imagePath);
        movie.setVideoFileName(videoPath);
        movie.setLength((int) video.getSize());
        movie.setCountry(country);
        movie.setGenres(genres);
        var savedMovie = movieRepository.save(movie);
   
        // fileService.deletImage(imagePath);
        // fileService.deletImage(videoPath);
        return movieMapper.toMovieDto(savedMovie);
    }

    @Transactional
    public MovieDto update(int id, MovieRequestDto movieDto, MultipartFile image, MultipartFile video){
        Movie movie = movieRepository.findById(id).orElseThrow(()->new NotFoundException("Movie not found"));
        String preImageFilename = movie.getImageFileName();
        String preVideoFileName = movie.getVideoFileName();

        if(image!=null&&!image.isEmpty()){
            try{
                String imageName = fileService.saveImage(image);
                movie.setImageFileName(imageName);
            }
            catch(Exception ex){
                throw ex;
            }
        }

        if(video!=null&&!video.isEmpty()){
            try{
                String videoName = fileService.saveVideo(video);
                movie.setVideoFileName(videoName);
            }
            catch(Exception ex){
                fileService.deletImage(movie.getImageFileName());
                throw ex;
            }
        }
        if(movieDto.getGenreIds()!=null){
            List<Genre> genres = genreRepository.findAllById(movieDto.getGenreIds());
            movie.setGenres(genres);
        }
        if(movieDto.getCountryId()!=null){
            Country country = countryRepository.findById(movieDto.getCountryId()).orElse(null);
            movie.setCountry(country);
        }
        movie.setDescription(movieDto.getDescription());
        movie.setName(movieDto.getName());
        
        try {
            movieRepository.save(movie);
        } catch (Exception ex) {
            if(image!=null&&!image.isEmpty())
                fileService.deletImage(movie.getImageFileName());
            if(video!=null&&!video.isEmpty())
                fileService.deleteVideo(movie.getVideoFileName());
            throw ex;
        }

        if(image!=null&&!image.isEmpty()){
            fileService.deletImage(preImageFilename);
        }
        if(video!=null&&!video.isEmpty()){
            fileService.deleteVideo(preVideoFileName);
        }
        

        return movieMapper.toMovieDto(movie);
    }
    public void deleteMovie(Integer id){
        int rowAffected = movieRepository.deleteMovieById(id);
        if(rowAffected==0) throw new NotFoundException("Movie not found");
    }
    @Cacheable(value = "movies",key = "#id")
    public MovieDto findMovieById(Integer id){
        Movie movie = movieRepository.findById(id).orElseThrow(()->new NotFoundException("Movie not found"));
        return movieMapper.toMovieDto(movie);
    }
    public List<MovieDto> findMoviesByGenre(String name, int offset, int limit){
        var genre = genreRepository.findByName(name).orElseThrow(()->new NotFoundException("Genre not found"));
        List<Movie> movies = movieRepository.findMovieByGenreId(genre.getId(),offset, limit);
        return movieMapper.toMovieDtos(movies);
    }

    public List<MovieDto> findMoviesByCountry(String country, int offset,int limit){
        
        List<Movie> movies = movieRepository.findByCountryName(country, PageRequest.of(offset/limit, limit)).getContent();
        return movieMapper.toMovieDtos(movies);

    }
    public List<MovieDto> searchMovies(String keyword){
        List<Movie> movies = movieRepository.searchMovies(keyword);
        return movieMapper.toMovieDtos(movies);
    }
}
