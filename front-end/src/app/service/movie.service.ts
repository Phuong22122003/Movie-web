import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost/api/v1/movies'

  getAll(offset: number, limit: number): Observable<Movie[]> {

    return this.http.get<Movie[]>(this.url, { params: { 'offset': offset, 'limit': limit } })
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
