import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowtimesRoutingModule } from './showtimes-routing.module';
import { ShowtimesComponent } from './showtimes.component';

@NgModule({
  declarations: [ShowtimesComponent],
  imports: [CommonModule, ShowtimesRoutingModule],
})
export class ShowtimesModule {}
