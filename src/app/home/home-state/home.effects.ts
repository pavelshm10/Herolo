import { catchError, of, switchMap } from "rxjs";
import { GetHome, GetCurrentWeather, GetHomeSuccess, GetCurrentWeatherSuccess, HomeActionTypes, GetWeekWeather, GetWeekWeatherSuccess } from "./home.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Actions,Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";

@Injectable({
    providedIn: 'root',
  })

export class HomeEffects {
    errorMsg: string='';
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
      ) {}
    
    @Effect()
    getHome$ = this.actions$.pipe(
      ofType(HomeActionTypes.GetHome),
      map((action) => (action as GetHome).payload),
      switchMap((payload) => {
        return this.httpClient
        .get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=hmFDpTqjiLEocysyuvMGkhnJeDZGzuXq&q=${payload.searchText}&languge=en-us`,
        )
        .pipe(
          map((response: any) => {
            if(response.length===1){
              return new GetHomeSuccess({
                  key:response[0].Key,
                  cityName: response[0].AdministrativeArea.LocalizedName
              });
            } return;
          }),
          catchError(error => {
            console.log("error ",error)
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
        })
        );
      }),
    );    

    @Effect()
    getCurrentWeather$ = this.actions$.pipe(
      ofType(HomeActionTypes.GetCurrentWeather),
      map((action) => (action as GetCurrentWeather).payload),
      switchMap((payload) => {
        return this.httpClient
        .get(
          `http://dataservice.accuweather.com/currentconditions/v1/${payload.key}?apikey=hmFDpTqjiLEocysyuvMGkhnJeDZGzuXq&languge=en-us&details=false`,
        )
        .pipe(
          map((response: any) => {
            return new GetCurrentWeatherSuccess({
              currentWeather: response[0].Temperature.Metric.Value,
              weatherText: response[0].WeatherText
            });
          }),
          catchError(error => {
            console.log("error ",error)
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
        })
        );
      }),
    );

    @Effect()
    getWeekWeather$ = this.actions$.pipe(
      ofType(HomeActionTypes.GetWeekWeather),
      map((action) => (action as GetWeekWeather).payload),
      switchMap((payload) => {
        return this.httpClient
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${payload.key}?apikey=hmFDpTqjiLEocysyuvMGkhnJeDZGzuXq&languge=en-us&details=false&metric=true`,
        )
        .pipe(
          map((response: any) => {
            return new GetWeekWeatherSuccess({
              weekWeather: response.DailyForecasts
            });
          }),
          catchError(error => {
            console.log("error ",error)
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            return of([]);
        })
        );
      }),
    );
}

