import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './userpage.component';
import { loggedInAsUserGuard } from '../core/guards/logged-in-as-user.guard';

const routes: Routes = [
  {
    path: 'userpage',
    component: UserpageComponent,
    canActivate: [loggedInAsUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpageRoutingModule {}
