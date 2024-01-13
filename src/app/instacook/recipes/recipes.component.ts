import { Component } from '@angular/core';
import { RecipesService } from '../../services/api/recipes.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RecipeDto } from '../dto/recipe';

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
    // private loadingService: LoadingService,
    // public header: HeaderService,
  ) { 
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(){
    //this.loadingService.loading$.next(true);
    this.recipesService
      .getAllRecipes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (elements) => {
          this.recipes$.next(elements);
        },
        error: (error) => {
          //this.isLoading$.next(false);
          console.log(error);
        },
      });
  }
}
