import { Component } from '@angular/core';
import { CardComponent } from "../../../components/card/card.component";
import { MovieService } from '../../../service/movie.service';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendation',
  imports: [CardComponent,CommonModule],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent {
  movies!: Movie[];
  constructor(private movieService: MovieService){

  }
  ngOnInit(){
    this.movieService.getAll(0,10).subscribe((movies)=>{
      this.movies = movies;
    })
  }
}
