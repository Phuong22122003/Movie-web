import { Component, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie';
import { Genre } from '../../models/genre';
import { Country } from '../../models/country';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { GenreService } from '../../service/genre.service';
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: 'app-movie-admin',
  imports: [ReactiveFormsModule, CommonModule, CardComponent, ModalComponent],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  movies: Movie[] = [];
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;


  constructor(private movieService: MovieService) {  
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAll(0, 10).subscribe((data) => {
      this.movies = data;
    })
  }

  openAddModal() {
    this.modalComponent.openModal();
  }

  edit(movie: Movie) {
    this.modalComponent.openModal(movie);
  }

  delete(id: number) {
    this.movieService.deleteMovie(id).subscribe(()=>{
      this.loadMovies();
    })
  }
}
