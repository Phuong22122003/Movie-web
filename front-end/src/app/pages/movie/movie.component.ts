import { Component } from '@angular/core';
import { FilmCardComponent } from "./film-card/film-card.component";
import { DetailComponent } from "./detail/detail.component";
import { CardComponent } from "../../components/card/card.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { ɵEmptyOutletComponent } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { CommentComponent } from "./comment/comment.component";

@Component({
  selector: 'app-movie',
  imports: [FilmCardComponent, DetailComponent, RecommendationComponent, CommentComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

}
