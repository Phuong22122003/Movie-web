import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieHeroComponent } from './movie-hero/movie-hero.component';
import { SmallCardComponent } from "../../components/small-card/small-card.component";
import { Movie } from '../../models/movie';
import { CardComponent } from "../../components/card/card.component";
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MovieHeroComponent, SmallCardComponent, CardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies!: Movie[];
  constructor(private movieService: MovieService){}
  loadMovies(){
    this.movieService.getAll(0,10).subscribe((movies)=>(this.movies=movies));
  }
  ngOnInit(){
    this.loadMovies();
  }
  movie = {
    id:1,
    name:"Avatar-the way of water",
    description: "Amazing",
    country:{
      id:"vietnam",
      name: "Viet Nam"
    },
    image_url:"https://i.pinimg.com/736x/24/83/62/248362b83090e77d104dc9d0b98a0e58.jpg",
    genres:[{
      id:1,
      name:"action"
    }]
  };
}
