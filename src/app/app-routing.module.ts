import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './instacook/recipes/recipes.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './instacook/home/home.component';
import { NewRecipeComponent } from './instacook/recipes/new-recipe/new-recipe.component';
import { LoginComponent } from './instacook/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/new', component: NewRecipeComponent },
  { path: 'recipes/:recipeId', component: NewRecipeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: false,
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
