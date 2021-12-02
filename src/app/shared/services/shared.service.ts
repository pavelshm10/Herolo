import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isCelsius:boolean=true;
  searchText:any;
  constructor() { }

  setFavorites(favorites:string){
    localStorage.removeItem('favorites');
    localStorage.setItem('favorites',favorites);
  }

  getFavorites(){
    return localStorage.getItem('favorites');
  }

  setTempratureType(isCelsius:boolean){
    this.isCelsius=isCelsius;
  }

  getTempratureType(){
    return this.isCelsius;
  }

  setSearchText(searchText:any){
    this.searchText=searchText;
  }

  getSearchText(){
    return this.searchText;
  }
}
