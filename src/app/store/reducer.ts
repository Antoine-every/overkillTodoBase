import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { loadTodosSuccess, toggleTodoState } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: Array<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),
  on(toggleTodoState, (state, { isClosed, todoId }) => ({
    ...state,
    todos: toggleTodo(isClosed, todoId, state.todos)
  })),
);

function toggleTodo(isClosed: boolean, todoId: string, todos: Array<Todo>): Array<Todo> {
  return todos.map(todo => {
    if (todo.title === todoId) {
      return {
        ...todo,
        isClosed
      };
    } else {
      return todo;
    }
  });
}
