import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./authentication-form/authentication-form.module').then(
        (m) => m.AuthenticationFormModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./userpage/userpage.module').then((m) => m.UserpageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./admindashboard/admindashboard.module').then(
        (m) => m.AdmindashboardModule
      ),
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
