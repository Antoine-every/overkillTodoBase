import { State } from './reducer';
import { selectTodos, filteredClosedTodos } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
    todos: [
      { title: 'todo1Title', isClosed: true, description: '' },
      { title: 'todo2Title', isClosed: false, description: '' },
    ]
  };
  const filteredState: State = {
    todos: [
      { title: 'todo1Title', isClosed: true, description: '' },
    ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select close todos list', () => {
    const result = filteredClosedTodos.projector(initialState);
    expect(result).toEqual(filteredState.todos);
  });
});
