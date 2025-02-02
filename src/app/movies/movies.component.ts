import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService, Movie } from '../core/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: false,
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.movies$;
    this.movieService.fetchMovies();

    this.movies$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err || 'Failed to fetch movies. Please try again later.';
      },
    });
  }
}
