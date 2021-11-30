import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/types/state.interface.ts';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HomeState } from 'src/app/home/types/home-state.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoritesArr:HomeState[]=[];

  constructor(
    public store: Store<AppState>,
    public actionsSubject: ActionsSubject,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    let favorites=this.sharedService.getFavorites();
    if(favorites){
      this.favoritesArr=JSON.parse(favorites);
    }
  }

}
