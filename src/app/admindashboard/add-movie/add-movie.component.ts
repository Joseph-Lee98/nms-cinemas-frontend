import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  standalone: false,
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup = new FormGroup({});
  genres: string[] = [];
  languages: string[] = [];
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      genre: ['', Validators.required],
      language: ['', Validators.required],
      durationMinutes: [null, [Validators.required, Validators.min(1)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      posterUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg))$/
          ),
        ],
      ],
    });

    this.fetchMovieGenresAndLanguages();
  }

  fetchMovieGenresAndLanguages(): void {
    this.movieService.getGenres().subscribe({
      next: (genres) => (this.genres = genres),
      error: () => console.error('Failed to fetch movie genres'),
    });

    this.movieService.getLanguages().subscribe({
      next: (languages) => (this.languages = languages),
      error: () => console.error('Failed to fetch movie languages'),
    });
  }

  onSubmit(): void {
    if (this.addMovieForm.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.movieService.addMovie(this.addMovieForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Movie added successfully!';
          this.addMovieForm.reset();
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage =
            error.error.message || 'An unexpected error occurred.';
        },
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
