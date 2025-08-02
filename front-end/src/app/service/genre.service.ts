import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
    constructor(private http: HttpClient){}
    url = 'http://localhost/api/v1/genres'

    getAll():Observable<Genre[]>{
        
        return this.http.get<Genre[]>(this.url);
    }
}
