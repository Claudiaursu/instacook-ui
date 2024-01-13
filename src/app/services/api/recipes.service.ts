import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RecipeDto } from '../../instacook/dto/recipe';


@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private api = environment.api + '/recipes';

  public loading$ = new BehaviorSubject<boolean>(false);
  public errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient) { }

  getAllRecipes(): Observable<RecipeDto[]> {
    return this.httpClient.get<RecipeDto[]>(`${this.api}`);
  }

  getRecipeById(recipeId: string): Observable<RecipeDto> {
    return this.httpClient.get<RecipeDto>(`${this.api}/${recipeId}`);
  }

  createRecipe(recipe: RecipeDto) {
    return this.httpClient.post<RecipeDto>(`${this.api}`, recipe);
  }

  deleteRecipe(recipeId: string) {
    return this.httpClient.delete<RecipeDto>(`${this.api}/${recipeId}`);
  }

  editRecipe(recipe: any, recipeId: number) {
    return this.httpClient.patch<any>(`${this.api}/${recipeId}`, recipe);
  }

}
