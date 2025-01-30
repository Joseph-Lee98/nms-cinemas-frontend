import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
}
