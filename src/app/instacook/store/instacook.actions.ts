import { createAction, props } from '@ngrx/store';
import { UserDto } from '../dto/user';

export enum InstacookActionTypes {
  LoadLoggedUserFailure = '[Instacook] Logged User Load Failure',
  LoadLoggedUserSuccess = '[Instacook] Logged User Loaded Success',
  LoadLoggedUser = '[Instacook] Load Logged User'
}

// Logged User
export const loadLoggedUser = createAction(InstacookActionTypes.LoadLoggedUser, props<{ userId: string }>());
export const loadLoggedUserSuccess = createAction(InstacookActionTypes.LoadLoggedUserSuccess, props<{ user: UserDto }>());
