import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const filteredClosedTodos = createSelector(
  getState,
  (state: State) => state.todos.filter(todo => todo.isClosed),
);
