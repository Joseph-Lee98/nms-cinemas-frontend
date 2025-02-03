import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService, Movie } from '../../core/services/movie.service';
import { TheatreService, Theatre } from '../../core/services/theatre.service';
import { ShowtimeService } from '../../core/services/showtime.service';

@Component({
  selector: 'app-add-showtime',
  templateUrl: './add-showtime.component.html',
  standalone: false,
  styleUrls: ['./add-showtime.component.css'],
})
export class AddShowtimeComponent implements OnInit {
  addShowtimeForm: FormGroup = new FormGroup({});
  movies: Movie[] = [];
  theatres: Theatre[] = [];
  loadingMovies: boolean = true;
  loadingTheatres: boolean = true;
  loadingSubmit: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private theatreService: TheatreService,
    private showtimeService: ShowtimeService
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchTheatres();

    this.addShowtimeForm = this.formBuilder.group({
      movieId: ['', Validators.required],
      theatreId: ['', Validators.required],
      showDate: ['', Validators.required],
      availableSeats: [{ value: '', disabled: true }, Validators.required],
    });

    this.addShowtimeForm
      .get('theatreId')
      ?.valueChanges.subscribe((theatreId) => {
        const selectedTheatre = this.theatres.find(
          (theatre) => theatre.theatreId === Number(theatreId)
        );
        if (selectedTheatre) {
          this.addShowtimeForm.patchValue({
            availableSeats: selectedTheatre.capacity,
          });
        }
      });
  }

  fetchMovies(): void {
    this.movieService.fetchMovies();
    this.movieService.movies$.subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loadingMovies = false;
      },
      error: () => {
        this.loadingMovies = false;
        this.errorMessage = 'Failed to fetch movies. Please try again.';
      },
    });
  }

  fetchTheatres(): void {
    this.theatreService.fetchTheatres();
    this.theatreService.theatres$.subscribe({
      next: (theatres) => {
        this.theatres = theatres;
        this.loadingTheatres = false;
      },
      error: () => {
        this.loadingTheatres = false;
        this.errorMessage = 'Failed to fetch theatres. Please try again.';
      },
    });
  }

  onSubmit(): void {
    if (this.addShowtimeForm.valid) {
      this.loadingSubmit = true;
      this.successMessage = '';
      this.errorMessage = '';

      const showtimeData = this.addShowtimeForm.getRawValue();

      this.showtimeService.addShowtime(showtimeData).subscribe({
        next: () => {
          this.loadingSubmit = false;
          this.successMessage = 'Showtime added successfully!';
          this.addShowtimeForm.reset();
        },
        error: (error) => {
          this.loadingSubmit = false;
          this.errorMessage =
            error.error.message || 'An unexpected error occurred.';
        },
      });
    }
  }
}
