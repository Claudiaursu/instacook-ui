import { InstacookState } from './instacook.reducer';
import { createSelector } from '@ngrx/store';

export const selectInstacook = (state: { instacook: InstacookState }) => state.instacook;

export const loggedUserSelector = createSelector(selectInstacook, (state: InstacookState) => state.user);
