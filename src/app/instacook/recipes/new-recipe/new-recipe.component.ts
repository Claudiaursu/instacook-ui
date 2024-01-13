import { ChangeDetectorRef, Component } from '@angular/core';
import { RecipesService } from '../../../services/api/recipes.service';
import { BehaviorSubject, Subject, lastValueFrom, takeUntil } from 'rxjs';
import { RecipeDto } from '../../dto/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { CollectionDto } from '../../dto/collection';
import { CollectionsService } from '../../../services/api/collections.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {

  private unsubscribe$ = new Subject<void>();
  public newRecipeForm!: FormGroup;
  existingRecipeId: string = '';
  currentRecipe$ = new BehaviorSubject<RecipeDto | null>(null)
  collections$ = new BehaviorSubject<CollectionDto[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private recipesService: RecipesService,
    private collectionsService: CollectionsService
  ) { 
    if(this.route?.snapshot.params['recipeId']){
      this.existingRecipeId =  String(this.route?.snapshot.params['recipeId'])
      console.log(this.existingRecipeId)
    }
    else{
      this.existingRecipeId = ''
    }  
  }

  ngOnInit(): void {
    this.newRecipeForm = this.formBuilder.group({
      titluReteta: ['', [Validators.required, Validators.maxLength(50)]],
      dificultate: ['', Validators.required],
      ingrediente: ['', Validators.required],
      instructiuni: ['', Validators.required],
      colectie: ['', Validators.required],
    })
    
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'fullName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 5,
    //   allowSearchFilter: true
    // };

    if(this.existingRecipeId){
      this.getCurrentRecipe(this.existingRecipeId)
    }
  }

  getCurrentRecipe(recipeId: string){
    //this.loadingService.loading$.next(true);
    this.recipesService
      .getRecipeById(recipeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (recipe) => {
          this.currentRecipe$.next(recipe);
        },
        error: (error) => {
          //this.isLoading$.next(false);
          console.log(error);
        },
      });
  }


  // getCollections(){
  //   this.collectionsService
  //     .getCollectionsByUserId()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe({
  //       next: (collections) => {
  //         this.sessions$.next(sessions);
  //         this.loadingService.loading$.next(false);
  //       },
  //       error: (error) => {
  //         this.isLoading$.next(false);
  //         console.log(error);
  //       },
  //     });
  // }

  async submitRecipe(){
    // const ownersIds = this.selectedUsers.map((user) =>{
    //   return { 
    //     "id": user.id 
    //   }
    // })

    let newRecipe: RecipeDto = {
      titluReteta: this.newRecipeForm.value.name,
      dificultate: this.newRecipeForm.value.description,
      ingrediente: this.newRecipeForm.value.ingrediente,
      instructiuni: this.newRecipeForm.value.instructiuni
    }

    const formData = new FormData();
    formData.append('file', this.newRecipeForm.get('file')?.value)
    // if(formData.get("file")){
    //   var uploadedFile = await lastValueFrom(this.uploadPhotoToBlob(formData))
    //   newTopic.topicImage = uploadedFile.path
    // }

    if(this.currentRecipe$.value !== null){
      this.recipesService.editRecipe(newRecipe, parseInt(this.existingRecipeId)).subscribe(response =>{
        this.router.navigate(["../recipes"]);
      })
    }
    else{
      this.recipesService.createRecipe(newRecipe).subscribe((response: any) =>{
        this.router.navigate(["../recipes"]);
      })
    }
  }
}
