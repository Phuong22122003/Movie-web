import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() movie!: Movie;
  ngOnInit(){
    this.movie.genres = this.movie.genres?.slice(0,2)||[];
  }
}
