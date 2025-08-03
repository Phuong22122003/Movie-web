import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    constructor(private http: HttpClient){}
    url = 'http://localhost/api/v1/countries'

    getAll():Observable<Country[]>{
        return this.http.get<Country[]>(this.url);
    }
}
