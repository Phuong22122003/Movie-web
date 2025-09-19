import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { Comment, CommentRequest } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommnetService {
    constructor(private http: HttpClient){}
    url = 'http://localhost/api/v1/comments'

    getAll(movieId:number):Observable<Comment[]>{
        return this.http.get<Comment[]>(this.url+'/'+movieId);
    }

    addComment(comment: CommentRequest): Observable<Comment>{
        return this.http.post<Comment>(this.url,comment);
    }
}