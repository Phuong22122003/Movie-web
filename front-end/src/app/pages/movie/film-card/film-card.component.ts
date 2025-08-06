import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-film-card',
  imports: [CommonModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent {
  @Input() movieUrl: any;
}
