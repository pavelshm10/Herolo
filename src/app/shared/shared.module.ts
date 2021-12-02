import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  exports: [
    HttpClientModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatCardModule
  ]
})
export class SharedModule { }
