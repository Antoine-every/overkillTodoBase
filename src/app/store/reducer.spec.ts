import * as fromReducer from './reducer';
import { State } from './reducer';
import { addTodo, addTodoSuccess, loadTodosSuccess, toggleTodoState } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ title: 'aTitle', isClosed: false, description: '' }] };
      const action = loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should toggle todos', () => {
      const initialState: State = {
        todos: [
          { title: 'todo1Title', isClosed: true, description: '' },
          { title: 'todo2Title', isClosed: false, description: '' },
        ]
      };
      const newState: State = {
        todos: [
          { title: 'todo1Title', isClosed: false, description: '' },
          { title: 'todo2Title', isClosed: false, description: '' },
        ]
      };
      const action = toggleTodoState({ isClosed: false, todoTitle: 'todo1Title' });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('should addTodo', () => {
      const initialState: State = {
        todos: [
          { title: 'todo1Title', isClosed: true, description: '' },
        ]
      };

      const newTodo = { title: 'todo2Title', isClosed: false, description: '' };

      const action = addTodo({ newTodo });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state).not.toBe(initialState);
    });

    it('should add TodoSuccess', () => {
      const initialState: State = {
        todos: [
          { title: 'todo1Title', isClosed: true, description: '' },
        ]
      };
      const newState: State = {
        todos: [
          { title: 'todo2Title', isClosed: false, description: '' },
          { title: 'todo1Title', isClosed: true, description: '' },
        ]
      };
      const newTodo = { title: 'todo2Title', isClosed: false, description: '' };

      const action = addTodoSuccess({ newTodo });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
