import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddTheatreComponent } from './add-theatre/add-theatre.component';
import { AddShowtimeComponent } from './add-showtime/add-showtime.component';

@NgModule({
  declarations: [AdmindashboardComponent, AddMovieComponent, AddTheatreComponent, AddShowtimeComponent],
  imports: [CommonModule, AdmindashboardRoutingModule, ReactiveFormsModule],
})
export class AdmindashboardModule {}
