import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { GenreService } from '../../service/genre.service';
import { CountryService } from '../../service/country.service';
import { Country } from '../../models/country';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;
  countries!: Country[];
  genres!: Genre[];
  constructor(private crd: ChangeDetectorRef,
    private authService: AuthenticationService,
    private router: Router,
    private genreService: GenreService,
    private countryService: CountryService
  ){}
  
  loadData(){
    this.countryService.getAll().subscribe((countries)=>(this.countries = countries));
    this.genreService.getAll().subscribe((genres)=>(this.genres = genres));
  }
  ngOnInit(){
    let jwt = localStorage.getItem('jwt');
    if(jwt != null) this.isLoggedIn = true;
    
    this.loadData();
    this.crd.detectChanges(); 
  }
  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
