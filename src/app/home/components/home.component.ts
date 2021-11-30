import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppState } from 'src/app/shared/types/state.interface.ts';
import { GetHome, GetCurrentWeather, GetWeekWeather } from '../home-state/home.actions';
import { HomeState } from '../types/home-state.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchText:any='Tel-aviv';
  weatherText:any;
  currentWeather:any;
  cityName:any;
  locationKey:any;
  weekWeather:any=[];
  enterInput=false;
  unsubscribe$ = new Subject();
  isFavorite=false;
  favoritesArr:HomeState[]=[];
  constructor(
    public store: Store<AppState>,
    public actionsSubject: ActionsSubject,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initFavoritesArr();
    this.store.dispatch(
      new GetHome({
        searchText:this.searchText
      }),
    )
    
    const index=this.favoritesArr.findIndex(item=>item.locationKey===this.locationKey);
        if (index > -1) {
          this.isFavorite=true;
        }

    this.store
    .select('home', 'locationKey')
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe((key) => {
       key ? 
       this.getWeatherAndDays(key)
       : ''
    });

    this.store
    .select('home')
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe((home) => {
      if(home.weekWeather){
        this.weatherText=home.weatherText;
        this.currentWeather=home.currentWeather;
        this.weekWeather=home.weekWeather;
        this.cityName=home.cityName;
        this.locationKey=home.locationKey;
        const index=this.favoritesArr.findIndex(item=>item.locationKey===this.locationKey);
        if (index > -1) {
          this.isFavorite=true;
        }
      }
    });
  }

  initFavoritesArr(){
    let favorites=this.sharedService.getFavorites();
    if(favorites){
      this.favoritesArr=JSON.parse(favorites);
    }
  }

  addToFavorites(){
    this.favoritesArr.push({
      locationKey: this.locationKey,
      cityName:this.cityName,
      currentWeather:this.currentWeather,
      weatherText: this.weatherText
    });
    this.sharedService.setFavorites(JSON.stringify(this.favoritesArr));
    this.isFavorite=true;
  }

  removeFromFavorites(){
    const index=this.favoritesArr.findIndex(item=>item.locationKey===this.locationKey);
    if (index > -1) {
      this.favoritesArr.splice(index, 1);
    }
    this.sharedService.setFavorites(JSON.stringify(this.favoritesArr));
    this.isFavorite=false;
  }

  getWeatherAndDays(key:any){
    this.store.dispatch(
      new GetCurrentWeather({
        key: key    
      }),
      
    )
    this.store.dispatch(
      new GetWeekWeather({
        key: key    
      }),
    )
  }

  searchValueChange(){
    this.store.dispatch(
      new GetHome({
        searchText:this.searchText    
      }),
    )
  }
  
  onBlur(){
    this.enterInput=false;
  }

  onClick(){
    this.enterInput=true;
  }
}
