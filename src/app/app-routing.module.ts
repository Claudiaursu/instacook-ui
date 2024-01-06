import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './instacook/recipes/recipes.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './instacook/home/home.component';

const routes: Routes = [
  // {
  //   path: '', component: HomeComponent,
  // },
  { path: 'recipes', component: RecipesComponent },
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
