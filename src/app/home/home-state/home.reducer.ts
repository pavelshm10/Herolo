import { HomeState } from "../types/home-state.interface";
import { HomeActions, HomeActionTypes } from "./home.actions";

export const initialState:HomeState= {};

export function homeReducer(state = initialState, action: HomeActions):HomeState {
    switch (action.type) {
        case HomeActionTypes.GetHomeSuccess:
            return {
              ...state,
              locationKey: action.payload.key,
              cityName: action.payload.cityName
            };
        case HomeActionTypes.GetCurrentWeatherSuccess:
          return {
            ...state,
            celsiusWeather: action.payload.celsiusWeather,
            fahrenheitWeather: action.payload.fahrenheitWeather,
            weatherText: action.payload.weatherText
          };
        case HomeActionTypes.GetWeekWeatherSuccess:
          return {
            ...state,
            weekWeather: action.payload.weekWeather
          };
          case HomeActionTypes.GetCurrentLocationSuccess:
            return {
              ...state,
              locationKey: action.payload.key,
              cityName: action.payload.cityName
            };
        default:
          return state;
    }
}