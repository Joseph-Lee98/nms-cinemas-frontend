import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationFormRoutingModule } from './authentication-form-routing.module';
import { AuthenticationFormComponent } from './authentication-form.component';

@NgModule({
  declarations: [AuthenticationFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthenticationFormRoutingModule],
})
export class AuthenticationFormModule {}
