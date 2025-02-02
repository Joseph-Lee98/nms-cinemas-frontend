import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Movie {
  movieId: number;
  title: string;
  genre: string;
  language: string;
  releaseDate: string;
  durationMinutes: number;
  description: string;
  posterUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl =
    'http://ec2-18-212-61-231.compute-1.amazonaws.com:8081/movies';

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/genres`);
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/languages`);
  }

  fetchMovies(): void {
    this.http.get<Movie[]>(this.apiUrl).subscribe({
      next: (movies) => {
        this.moviesSubject.next(movies || []);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.moviesSubject.error('Failed to fetch movies');
      },
    });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}`, movie).pipe(
      tap((newMovie) => {
        this.moviesSubject.next([...this.moviesSubject.value, newMovie]);
      })
    );
  }
}
