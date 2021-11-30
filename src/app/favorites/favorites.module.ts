import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './components/favorites.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
  ]
})
export class FavoritesModule { }
