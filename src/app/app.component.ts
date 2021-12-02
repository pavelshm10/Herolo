import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { GetCurrentWeather, GetHome, GetHomeSuccess, GetWeekWeather, HomeActionTypes } from './home/home-state/home.actions';
import { SharedService } from './shared/services/shared.service';
import { AppState } from './shared/types/state.interface.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Herolo';
  isCelsius=true;
  color: ThemePalette = 'accent';
  checked = true;
  disabled = false;
  tempratureType='Celsius';
  unsubscribe$ = new Subject();
  constructor(private router: Router,
    private overlay: OverlayContainer,
    private sharedService: SharedService,
    public store: Store<AppState>,
    private actionsSubject: ActionsSubject,
    ) {}

  ngOnInit() {
    this.router.navigate([''])
    
    this.actionsSubject
    .pipe(
      ofType(HomeActionTypes.GetHomeSuccess),
      map((action) => (action as GetHomeSuccess).payload),
      takeUntil(this.unsubscribe$),
    )
    .subscribe((data) => {
      this.getWeatherAndDays(data.key)
    });
  }

  toggleTheme(){
    if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
      this.overlay.getContainerElement().classList.remove("dark-theme");
      this.overlay.getContainerElement().classList.add("light-theme");
    } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
      this.overlay.getContainerElement().classList.remove("light-theme");
      this.overlay.getContainerElement().classList.add("dark-theme");
    } else {
      this.overlay.getContainerElement().classList.add("light-theme");
    }
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }

  onToggleChange(){
    this.isCelsius=!this.isCelsius;
    this.sharedService.setTempratureType(this.isCelsius);
    this.isCelsius ? this.tempratureType='Celsius' : this.tempratureType='Fahrenheit'
    if(this.sharedService.getSearchText()){
      this.store.dispatch(
        new GetHome({
          searchText:this.sharedService.getSearchText()    
        }),
      )
    }
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
}
