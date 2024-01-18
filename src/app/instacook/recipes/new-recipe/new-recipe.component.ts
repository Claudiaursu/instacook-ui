import { ChangeDetectorRef, Component } from '@angular/core';
import { RecipesService } from '../../../services/api/recipes.service';
import { BehaviorSubject, Subject, lastValueFrom, takeUntil } from 'rxjs';
import { RecipeDto } from '../../dto/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { CollectionDto } from '../../dto/collection';
import { CollectionsService } from '../../../services/api/collections.service';
import { InstacookState } from '../../store/instacook.reducer';
import { Store } from '@ngrx/store';
import { loggedUserSelector } from '../../store/instacook.selectors';


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
  loggedUserId: number = 0;
  selectedCollection: CollectionDto | undefined = undefined;
  selectedCollection2$ = new BehaviorSubject<CollectionDto>({});
  //collectionOptions

  constructor(
    private store: Store<{instacook: InstacookState}>,
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

    this.store.select(loggedUserSelector)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result) => {
      if(result?.id) {
        this.loggedUserId = result?.id;
      }
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

    this.getCollectionsForUser();
    console.log("---------COLLECTRII ", this.collections$)
  }

  // onCollectionChange(selectedCollection: CollectionDto) {
  //   this.selectedCollection2$.next(selectedCollection);
  // }

  getCurrentRecipe(recipeId: string){
    this.recipesService
      .getRecipeById(recipeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (recipe) => {
          this.currentRecipe$.next(recipe);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }


  getCollectionsForUser(){
    this.collectionsService
      .getCollectionsByUserId(this.loggedUserId.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (collections) => {
          this.collections$.next(collections);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  async submitRecipe(){

    let newRecipe: RecipeDto = {
      titluReteta: this.newRecipeForm.value.titluReteta,
      dificultate: this.newRecipeForm.value.dificultate,
      ingrediente: this.newRecipeForm.value.ingrediente.split(","),
      instructiuni: this.newRecipeForm.value.instructiuni,
      colectie: this.newRecipeForm.value.colectie,
    }

    const formData = new FormData();
    //formData.append('file', this.newRecipeForm.get('file')?.value)
    // if(formData.get("file")){
    //   var uploadedFile = await lastValueFrom(this.uploadPhotoToBlob(formData))
    //   newTopic.topicImage = uploadedFile.path
    // }

    if (this.currentRecipe$.value !== null) {
      console.log("se face editeaza reteta")
      this.recipesService.editRecipe(newRecipe, parseInt(this.existingRecipeId)).subscribe(response =>{
        this.router.navigate(["../recipes"]);
      })
    }
    else {
      //console.log("se face reteta NOUA....", newRecipe)
      console.log("se face reteta NOUA....", newRecipe.colectie?.id)
    
      this.recipesService.createRecipe(newRecipe).subscribe((response: any) =>{
        this.router.navigate(["../recipes"]);
      })
    }
  }
}
