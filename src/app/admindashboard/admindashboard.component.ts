import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  standalone: false,

  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  showAddMovieForm: boolean = false;

  toggleAddMovieForm(): void {
    this.showAddMovieForm = !this.showAddMovieForm;
  }
}
