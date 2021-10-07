import { Todo } from '../models/todo';
import { createReducer, on } from '@ngrx/store';
import { addTodo, addTodoSuccess, loadTodosSuccess, toggleTodoState } from './actions';

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
  on(toggleTodoState, (state, { isClosed, todoTitle }) => ({
    ...state,
    todos: toggleTodo(isClosed, todoTitle, state.todos)
  })),
  on(
    addTodo,
    (state): State => ({
      ...state,
    })
  ),
  on(
    addTodoSuccess,
    (state, { newTodo }): State => ({
      ...state,
      todos: [newTodo, ...state.todos],
    })
  )
);

function toggleTodo(isClosed: boolean, todoTitle: string, todos: Array<Todo>): Array<Todo> {
  return todos.map(todo => {
    if (todo.title === todoTitle) {
      return {
        ...todo,
        isClosed
      };
    } else {
      return todo;
    }
  });
}
