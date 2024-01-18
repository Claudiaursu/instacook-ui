import { Component } from '@angular/core';
import { RecipesService } from '../../services/api/recipes.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RecipeDto } from '../dto/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  private unsubscribe$ = new Subject<void>();
  recipes$ = new BehaviorSubject<RecipeDto[]>([]);

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.recipesService
      .getAllRecipes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (elements) => {
          this.recipes$.next(elements);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteRecipe(recipeId: number | undefined){
    if (recipeId) {
      this.recipesService.deleteRecipe(recipeId.toString()).subscribe((response: any) =>{
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      })
    }
  }
}
