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
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    EffectsModule.forFeature([InstacookEffects]),
    StoreModule.forFeature(fromInstacookReducer.instacookFeatureKey, fromInstacookReducer.reducer)

  ],
  exports: [
    HomeComponent
  ]
})
export class InstacookModule { }
