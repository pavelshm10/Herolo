import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setFavorites(favorites:string){
    localStorage.removeItem('favorites');
    localStorage.setItem('favorites',favorites);
  }

  getFavorites(){
    return localStorage.getItem('favorites');
  }
}
