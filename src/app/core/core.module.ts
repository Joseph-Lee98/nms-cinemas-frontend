import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [NavbarComponent, PagenotfoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
