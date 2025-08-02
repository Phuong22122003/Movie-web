import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { Genre } from '../../models/genre';
import { Country } from '../../models/country';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-movie-admin',
  imports: [ReactiveFormsModule, CommonModule, CardComponent],
  templateUrl: './movie-admin.component.html',
  styleUrl: './movie-admin.component.scss'
})
export class MovieAdminComponent {
  movies: Movie[] = [];
  genres: Genre[] = [];
  movieForm: FormGroup;
  showModal = false;
  isEditing = false;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private movieService: MovieService, private genreService: GenreService) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image_url: [''],
      video_url: ['']
    });
    this.loadMovies();
    this.loadGenres();
  }
  loadMovies() {
    this.movieService.getAll(0, 10).subscribe((data) => {
      for (let i of data) {
        i.image_url = 'https://i.pinimg.com/736x/24/83/62/248362b83090e77d104dc9d0b98a0e58.jpg'
      }
      this.movies = data;
    })
  }

  loadGenres() {
    this.genreService.getAll().subscribe((data) => {
      this.genres = data;
    }
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.editingId = null;
    this.movieForm.reset();
    this.showModal = true;
  }

  edit(movie: Movie) {
    this.isEditing = true;
    this.editingId = movie.id;
    this.movieForm.patchValue(movie);
    this.showModal = true;
  }

  submit() {
    const formValue = this.movieForm.value;
    if (this.isEditing && this.editingId !== null) {
      const index = this.movies.findIndex(m => m.id === this.editingId);
      if (index > -1) {
        this.movies[index] = { id: this.editingId, ...formValue };
      }
    } else {
      const newId = this.movies.length ? Math.max(...this.movies.map(m => m.id)) + 1 : 1;
      this.movies.push({ id: newId, ...formValue });
    }
    this.closeModal();
  }

  delete(id: number) {
    this.movies = this.movies.filter(m => m.id !== id);
  }

  closeModal() {
    this.showModal = false;
    this.movieForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }

  imageFile!: File;
  videoFile!: File;

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.imageFile = fileInput.files[0];
    }
  }

  onVideoSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.length) {
      this.videoFile = fileInput.files[0];
    }
  }
}
