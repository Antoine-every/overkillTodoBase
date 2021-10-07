import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const loadTodos = createAction('[Todos] Load todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction('[Todos] Load todos failed');

export const toggleTodoState = createAction('[Todos] Update todos state', props<{ isClosed: boolean, todoTitle: string }>());

export const addTodo = createAction('[Todos] Add todo loading..', props<{ newTodo: Todo }>());

export const addTodoSuccess = createAction(
  '[Todos] Add todo success',
  props<{ newTodo: Todo }>()
);

export const addTodoFailed = createAction('[Todos] Add todo failed');
