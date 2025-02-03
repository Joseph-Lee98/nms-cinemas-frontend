import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowtimesComponent } from './showtimes.component';
import { loggedInGuard } from '../core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'showtimes/:movieId',
    component: ShowtimesComponent,
    canActivate: [loggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowtimesRoutingModule {}
