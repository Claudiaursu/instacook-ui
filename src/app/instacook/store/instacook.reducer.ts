import { createReducer, on, Action } from '@ngrx/store';
import { 
  loadLoggedUserSuccess
} from './instacook.actions';
import { UserDto } from '../dto/user';

export const instacookFeatureKey = 'instacook';

export interface InstacookState {
  user: UserDto | null;
}

export const initialInstacookState: InstacookState = {
  user: null
};

export const reducer = createReducer(
  initialInstacookState,
  on(loadLoggedUserSuccess, (state: any, { user }) => ({
    ...state,
    user,
  }))
);

export function instacookReducer(state: InstacookState, action: Action): InstacookState {
  return reducer(state as InstacookState, action as Action);
}
