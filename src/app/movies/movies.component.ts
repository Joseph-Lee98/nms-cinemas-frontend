import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService, Movie } from '../core/services/movie.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

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
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router
  ) {}

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

    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isAdmin$ = this.authService.isAdmin$;
  }

  bookTickets(movieId: number): void {
    this.router.navigate([`/showtimes/${movieId}`]);
  }

  editMovie(movieId: number): void {
    console.log(`Editing movie ID: ${movieId}`);
  }

  deleteMovie(movieId: number): void {
    console.log(`Deleting movie ID: ${movieId}`);
  }
}
