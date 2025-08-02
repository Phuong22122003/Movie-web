import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient){}
    url = 'http://localhost/api/v1/movies'

    getAll(offset:number, limit:number):Observable<Movie[]>{
        
        return this.http.get<Movie[]>(this.url,{params:{'offset':offset, 'limit':limit}})
    }
}
