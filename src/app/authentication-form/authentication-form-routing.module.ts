import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationFormComponent } from './authentication-form.component';
import { loggedOutGuard } from '../core/guards/logged-out.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationFormComponent,
    canActivate: [loggedOutGuard],
  },
  {
    path: 'register',
    component: AuthenticationFormComponent,
    canActivate: [loggedOutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationFormRoutingModule {}
