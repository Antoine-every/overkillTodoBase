import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import { addTodo, addTodoFailed, addTodoSuccess, loadTodos, loadTodosFailed, loadTodosSuccess } from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ title: 'aTitle', isClosed: true, description: '' }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });


  describe('addTodo$', () => {
    it('should dispatch addTodosSuccess action when todoService.addTodo return a result', () => {
      const mockedTodo: Todo = { title: 'aTitle', isClosed: true, description: '' };
      todoService.create.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: addTodo({ newTodo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: addTodoSuccess({ newTodo: mockedTodo }),
      });

      expect(effects.addTodo$).toBeObservable(expected);
    });

    it('should dispatch addTodosFailed action when todoService.addTodo fails', () => {
      const mockedTodo: Todo = { title: 'aTitle', isClosed: true, description: '' };
      todoService.create.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: addTodo({ newTodo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: addTodoFailed(),
      });

      expect(effects.addTodo$).toBeObservable(expected);
    });
  });
});
