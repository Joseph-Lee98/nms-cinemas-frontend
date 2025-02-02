import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard.component';
import { loggedInAsAdminGuard } from '../core/guards/logged-in-as-admin.guard';

const routes: Routes = [
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    canActivate: [loggedInAsAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmindashboardRoutingModule {}
