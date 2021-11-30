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
  searchText:any='tel-aviv';
  weatherText:any='Sunny';
  currentWeather:any= 25;//number|undefined;
  cityName:any='tel-aviv';
  locationKey:any=215793;
  weekWeather:any=[
    {
      "Date": "2021-11-29T07:00:00+02:00",
      "EpochDate": 1638162000,
      "Temperature": {
        "Minimum": {
          "Value": 19.8,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 30.2,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 4,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 36,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?unit=c&lang=en-us"
    },
    {
      "Date": "2021-11-30T07:00:00+02:00",
      "EpochDate": 1638248400,
      "Temperature": {
        "Minimum": {
          "Value": 20.1,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 27.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 6,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 38,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=1&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=1&unit=c&lang=en-us"
    },
    {
      "Date": "2021-12-01T07:00:00+02:00",
      "EpochDate": 1638334800,
      "Temperature": {
        "Minimum": {
          "Value": 19.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 21.6,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 14,
        "IconPhrase": "Partly sunny w/ showers",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Light"
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Light"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=2&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=2&unit=c&lang=en-us"
    },
    {
      "Date": "2021-12-02T07:00:00+02:00",
      "EpochDate": 1638421200,
      "Temperature": {
        "Minimum": {
          "Value": 16.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 21.6,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=3&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=3&unit=c&lang=en-us"
    },
    {
      "Date": "2021-12-03T07:00:00+02:00",
      "EpochDate": 1638507600,
      "Temperature": {
        "Minimum": {
          "Value": 17.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 22.4,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 4,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=4&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv-port/215793/daily-weather-forecast/215793?day=4&unit=c&lang=en-us"
    }
  ]
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
    // this.store.dispatch(
    //   new GetHome({
    //     searchText:this.searchText
    //   }),
    // )
    
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
    console.log("before ",this.favoritesArr);
    this.favoritesArr.push({
      locationKey: this.locationKey,
      cityName:this.cityName,
      currentWeather:this.currentWeather,
      weatherText: this.weatherText
    });
    this.sharedService.setFavorites(JSON.stringify(this.favoritesArr));
    this.isFavorite=true;
    console.log("after ",this.favoritesArr);
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
