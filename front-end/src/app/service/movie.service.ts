import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { PageResponse } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost/api/v1/movies';

  getRecentylyUpdateMovie(limit:number): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.url}/recently-update`, {params:{'limit':limit}});
  }
  getMovieSlot(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.url}/slots`);
  }
  searchMovie(query:string, pageNumber:number, pageSize:number): Observable<PageResponse<Movie>>{
    return this.http.get<PageResponse<Movie>>(`${this.url}/search`,{params:{'q':query,'page_number':pageNumber,'page_size':pageSize}});
  }
  getAll(offset: number, limit: number): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.url, { params: { 'offset': offset, 'limit': limit } });
  }

  getMovieByGenre(genre: string, offset: number, limit: number){
    return this.http.get<Movie[]>(`${this.url}/genres/${genre}`,{params:{'offset':offset, 'limit':limit}});
  }
  getMovieByCountry(country: string, offset: number, limit: number){
    return this.http.get<Movie[]>(`${this.url}/country/${country}`,{params:{'offset':offset, 'limit':limit}});
  }
  getById(id:string): Observable<Movie>{
    return this.http.get<Movie>(this.url+`/${id}`);
  }
  addMovie(movie:FormData){
    console.log('add movie');
    
    return this.http.post('http://localhost:80/api/v1/manage/movies',movie);
  }
  updateMovie(id:number,movie:FormData){
    console.log('update movie');
    return this.http.patch(`http://localhost:80/api/v1/manage/movies/${id}`,movie);
  }
  deleteMovie(id:number){
    console.log('delete movie');
    return this.http.delete(`http://localhost:80/api/v1/manage/movies/${id}`);  
  }
}
