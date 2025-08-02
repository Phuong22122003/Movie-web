import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-hero',
  imports: [CommonModule],
  templateUrl: './movie-hero.component.html',
  styleUrl: './movie-hero.component.scss'
})
export class MovieHeroComponent {
  currentIndex = 0;

  slides = [
    {
      title: 'Movie One',
      description: 'Description of movie one.',
      image: 'https://lumiere-a.akamaihd.net/v1/images/avatar-twow-videobg01_cdd3dcb8.jpeg'
    },
    {
      title: 'Movie Two',
      description: 'Description of movie two.',
      image: 'https://wallpapers.com/images/featured/avatar-2-the-way-of-water-vyj6bizvovhbk144.jpg'
    },
    {
      title: 'Movie Three',
      description: 'Description of movie three.',
      image: 'https://lumiere-a.akamaihd.net/v1/images/avatar-twow-videobg01_cdd3dcb8.jpeg'
    }
  ];

  setSlide(index: number) {
    this.currentIndex = index;
  }
  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

}
