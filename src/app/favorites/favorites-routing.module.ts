import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites.component';

const routes: Routes = [
  { path: 'favorites', 
  component: FavoritesComponent,
  data: {
    id: 'favorites',
  }, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
