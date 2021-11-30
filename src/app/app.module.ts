import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesModule } from './favorites/favorites.module';
import { HomeModule } from './home/home.module';
import {ActionReducerMap, RuntimeChecks, StoreModule} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from './shared/types/state.interface.ts';
import { homeReducer } from './home/home-state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const reducers: ActionReducerMap<AppState> = {
  home: homeReducer,
} as ActionReducerMap<AppState>;

const devMode = !environment.production;
const runtimeChecks: RuntimeChecks = {
  strictActionImmutability: false,
  strictActionSerializability: false,
  strictStateImmutability: devMode,
  strictStateSerializability: devMode,
  strictActionWithinNgZone: devMode,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FavoritesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
