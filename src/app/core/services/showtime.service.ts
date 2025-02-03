import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from './movie.service';
import { Theatre } from './theatre.service';

export interface Showtime {
  showtimeId: number;
  movieId: number;
  theatreId: number;
  showDate: Date;
  availableSeats: number;
  theatreName?: string;
  theatreLocation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShowtimeService {
  private apiUrl =
    'http://ec2-18-212-61-231.compute-1.amazonaws.com:8081/showtimes';

  private showtimesSubject = new BehaviorSubject<Showtime[]>([]);
  showtimes$ = this.showtimesSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchShowtimes(): void {
    this.http.get<Showtime[]>(this.apiUrl).subscribe({
      next: (showtimes) => this.showtimesSubject.next(showtimes || []),
      error: (error) => {
        console.error('Error fetching showtimes:', error);
        this.showtimesSubject.next([]);
      },
    });
  }

  fetchShowtimesByMovieId(movieId: number): void {
    this.http.get<Showtime[]>(`${this.apiUrl}/${movieId}`).subscribe({
      next: (showtimes) => this.showtimesSubject.next(showtimes || []),
      error: (error) => {
        console.error('Error fetching showtimes:', error);
        this.showtimesSubject.next([]);
      },
    });
  }

  addShowtime(showtimeData: {
    movieId: number;
    theatreId: number;
    showDate: string;
    availableSeats: number;
  }): Observable<Showtime> {
    return this.http.post<Showtime>(this.apiUrl, showtimeData).pipe(
      tap((newShowtime) => {
        this.showtimesSubject.next([
          ...this.showtimesSubject.value,
          newShowtime,
        ]);
      })
    );
  }
}
