import { Component } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { PageFooterComponent } from "../../components/page-footer/page-footer.component";
import { Page } from '../../models/page';

@Component({
  selector: 'app-search',
  imports: [CardComponent, CommonModule, PageFooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  movies: Movie[] = [];
  query: string = '';
  page: Page = {
    total: 0,
    currentPage: 1,
    pageSize: 10
  };
  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      this.query = query;
      this.movieService.searchMovie(query, 0, this.page.pageSize).subscribe(pageResponse => {
        this.movies = pageResponse.content;
        this.page.total = pageResponse.totalElements;
      });
    });
  }


  onPageChange(page: number) {
    this.page.currentPage = page;
    this.movieService.searchMovie(this.query, page - 1,this.page.pageSize).subscribe(pageResponse => {
      this.movies = pageResponse.content;
    });
  }
}
