import { Action } from "@ngrx/store";

export enum HomeActionTypes {
    GetHome = '[Home] GetHome',
    GetHomeSuccess='[Home] GetHomeSuccess',
    GetHomeFailure='[Home] GetHomeFailure',
    GetCurrentWeather = '[Home] GetCurrentWeather',
    GetCurrentWeatherSuccess='[Home] GetCurrentWeatherSuccess',
    GetCurrentWeatherFailure='[Home] GetCurrentWeatherFailure',
    GetWeekWeather = '[Home] GetWeekWeather',
    GetWeekWeatherSuccess='[Home] GetWeekWeatherSuccess',
    GetWeekWeatherFailure='[Home] GetWeekWeatherFailure',
    GetCurrentLocation = '[Home] GetCurrentLocation',
    GetCurrentLocationSuccess='[Home] GetCurrentLocationSuccess',
    GetCurrentLocationFailure='[Home] GetCurrentLocationFailure',
  }

export class GetHome implements Action {
    readonly type = HomeActionTypes.GetHome;
    constructor(public payload:{
        searchText : string;
    },
    ) {}
}

export class GetHomeSuccess implements Action {
    readonly type = HomeActionTypes.GetHomeSuccess;
    constructor(
        public payload: {
            key:number;
            cityName: string;
        },
      ) {}
}

export class GetHomeFailure implements Action {
    readonly type = HomeActionTypes.GetHomeFailure;
    constructor() {}
}

export class GetCurrentWeather implements Action {
    readonly type = HomeActionTypes.GetCurrentWeather;
    constructor(public payload:{
        key : number;
    },
    ) {}
}

export class GetCurrentWeatherSuccess implements Action {
    readonly type = HomeActionTypes.GetCurrentWeatherSuccess;
    constructor(
        public payload: {
            currentWeather: number,
            weatherText: string
        },
      ) {}
}

export class GetCurrentWeatherFailure implements Action {
    readonly type = HomeActionTypes.GetCurrentWeatherFailure;
    constructor() {}
}

export class GetWeekWeather implements Action {
    readonly type = HomeActionTypes.GetWeekWeather;
    constructor(public payload:{
        key : number;
    },
    ) {}
}

export class GetWeekWeatherSuccess implements Action {
    readonly type = HomeActionTypes.GetWeekWeatherSuccess;
    constructor(
        public payload: {
            weekWeather: []
        },
      ) {}
}

export class GetWeekWeatherFailure implements Action {
    readonly type = HomeActionTypes.GetWeekWeatherFailure;
    constructor() {}
}

export class GetCurrentLocation implements Action {
    readonly type = HomeActionTypes.GetCurrentLocation;
    constructor(public payload:{
        lat : number;
        lon : number;
    },
    ) {}
}

export class GetCurrentLocationSuccess implements Action {
    readonly type = HomeActionTypes.GetCurrentLocationSuccess;
    constructor(
        public payload: {
            key:number;
            cityName: string;
        },
      ) {}
}

export class GetCurrentLocationFailure implements Action {
    readonly type = HomeActionTypes.GetCurrentLocationFailure;
    constructor() {}
}

export type HomeActions=
    |GetHome
    |GetHomeSuccess
    |GetHomeFailure
    |GetCurrentWeather
    |GetCurrentWeatherSuccess
    |GetCurrentWeatherFailure
    |GetWeekWeather
    |GetWeekWeatherSuccess
    |GetWeekWeatherFailure
    |GetCurrentLocation
    |GetCurrentLocationSuccess
    |GetCurrentLocationFailure;
    
