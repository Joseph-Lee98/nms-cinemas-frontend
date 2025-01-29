import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationFormRoutingModule } from './authentication-form-routing.module';
import { AuthenticationFormComponent } from './authentication-form.component';


@NgModule({
  declarations: [
    AuthenticationFormComponent
  ],
  imports: [
    CommonModule,
    AuthenticationFormRoutingModule
  ]
})
export class AuthenticationFormModule { }
