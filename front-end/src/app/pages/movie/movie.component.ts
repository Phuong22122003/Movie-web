import { ChangeDetectorRef, Component } from '@angular/core';
import { FilmCardComponent } from "./film-card/film-card.component";
import { DetailComponent } from "./detail/detail.component";
import { CardComponent } from "../../components/card/card.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { CommentComponent } from "./comment/comment.component";
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [FilmCardComponent, DetailComponent, RecommendationComponent, CommentComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  movieId!: string;
  movie!: Movie;
  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    let movieId = this.route.snapshot.paramMap.get('id');
    if (movieId != null) {
      this.movieId = movieId;
    }
  }
  loadMovie() {
    this.movieService.getById(this.movieId).subscribe((movie) => { 
      this.movie = movie;
      console.log(this.movie);
    });
  }
  ngOnInit() {
    this.loadMovie();
  }
}
