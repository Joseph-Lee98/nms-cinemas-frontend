import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: false,

  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
        this.errorMessage = 'Failed to fetch movies. Please try again later.';
      },
    });
  }
}
