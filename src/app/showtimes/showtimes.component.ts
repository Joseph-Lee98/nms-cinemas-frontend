import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ShowtimeService, Showtime } from '../core/services/showtime.service';
import { TheatreService, Theatre } from '../core/services/theatre.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrls: ['./showtimes.component.css'],
  standalone: false,
})
export class ShowtimesComponent implements OnInit {
  showtimes$!: Observable<Showtime[]>;
  theatres$!: Observable<Theatre[]>;
  loading: boolean = true;
  errorMessage: string = '';
  movieId!: number;

  constructor(
    private showtimeService: ShowtimeService,
    private theatreService: TheatreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));

    this.theatreService.fetchTheatres();
    this.theatres$ = this.theatreService.theatres$;

    this.showtimeService.fetchShowtimesByMovieId(this.movieId);

    this.showtimes$ = combineLatest([
      this.showtimeService.showtimes$,
      this.theatres$,
    ]).pipe(
      map(([showtimes, theatres]) => {
        return showtimes.map((showtime) => {
          const theatre = theatres.find(
            (t) => Number(t.theatreId) === Number(showtime.theatreId)
          );

          return {
            ...showtime,
            theatreName: theatre ? theatre.name : 'Theatre Not Found',
            theatreLocation: theatre ? theatre.location : 'Location Not Found',
          } as Showtime;
        });
      })
    );

    this.showtimes$.subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err || 'Failed to fetch showtimes. Please try again later.';
      },
    });
  }
}
