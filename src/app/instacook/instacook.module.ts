import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import * as fromInstacookReducer from '../instacook/store/instacook.reducer';
import { InstacookEffects } from './store/instacook.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    RecipesComponent,
    HomeComponent,
    NewRecipeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([InstacookEffects]),
    StoreModule.forFeature(fromInstacookReducer.instacookFeatureKey, fromInstacookReducer.reducer)

  ],
  exports: [
    HomeComponent
  ]
})
export class InstacookModule { }
