import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() movie!: Movie;
}
