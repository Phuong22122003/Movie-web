import { Component } from '@angular/core';
import { CardComponent } from "../../../components/card/card.component";

@Component({
  selector: 'app-recommendation',
  imports: [CardComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent {
  movie = {
    id: 1,
    name: "Avatar-the way of water",
    description: "Amazing",
    country: {
      id: "vietnam",
      name: "Viet Nam"
    },
    image_url: "https://i.pinimg.com/736x/24/83/62/248362b83090e77d104dc9d0b98a0e58.jpg",
    genres: [{
      id: 1,
      name: "action"
    }]
  };
}
