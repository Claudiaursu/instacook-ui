import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { 
  InstacookActionTypes,
  loadLoggedUser,
  loadLoggedUserSuccess,
 } from './instacook.actions';
import { InstacookState } from './instacook.reducer';
import { AuthService } from '../../services/api/auth.service';


@Injectable()
export class InstacookEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store$: Store<{ instacook: InstacookState }>
  ) { }

   // Load Logged User
   loadLoggedUser$ = createEffect(() =>
   this.actions$.pipe(
     ofType(loadLoggedUser),
     exhaustMap((action) =>
       this.authService.getCurrentUserDetails(action.userId).pipe(
         map((user) =>
           loadLoggedUserSuccess({
             user
           })
         ),
         catchError(() => of({ type: InstacookActionTypes.LoadLoggedUserFailure }))
       )
     )
   )
 );

}
