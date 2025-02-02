import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Theatre {
  theatreId: number;
  name: string;
  location: string;
  capacity: number;
}

@Injectable({
  providedIn: 'root',
})
export class TheatreService {
  private apiUrl =
    'http://ec2-18-212-61-231.compute-1.amazonaws.com:8081/theatres';

  private theatresSubject = new BehaviorSubject<Theatre[]>([]);
  theatres$ = this.theatresSubject.asObservable();

  constructor(private http: HttpClient) {}

  // fetchTheatres(): void {
  //   this.http.get<Theatre[]>(this.apiUrl).subscribe({
  //     next: (theatres) => this.theatresSubject.next(theatres || []),
  //     error: (error) => {
  //       console.error('Error fetching theatres:', error);
  //       this.theatresSubject.next([]);
  //     },
  //   });
  // }

  addTheatre(theatre: Theatre): Observable<Theatre> {
    return this.http.post<Theatre>(this.apiUrl, theatre).pipe(
      tap((newTheatre) => {
        this.theatresSubject.next([...this.theatresSubject.value, newTheatre]);
      })
    );
  }
}
