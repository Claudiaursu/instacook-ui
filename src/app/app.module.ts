import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstacookModule } from './instacook/instacook.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromInstacookReducer from '../../src/app/instacook/store/instacook.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InstacookEffects } from './instacook/store/instacook.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InstacookModule,
    RouterModule,
    HttpClientModule,
    EffectsModule.forRoot([InstacookEffects]),
    StoreModule.forRoot({}, {}),
    //StoreModule.forFeature(fromInstacookReducer.instacookFeatureKey, fromInstacookReducer.reducer),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
