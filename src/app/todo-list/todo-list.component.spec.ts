import { toggleTodoState } from './../store/actions';
import { filteredClosedTodos } from './../store/selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MockComponents, MockedComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let router: Router;
  let mockTodosSelector;
  let mockFilteredTodosSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatButton,
          MatDivider,
          MatIcon,
          MatCard
        ),
      ],
      imports: [MatRippleModule, FormsModule, RouterTestingModule],
      providers: [provideMockStore(), {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 'todo 123' })
        }
      }],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { title: 'todo 1', isClosed: false, description: 'Description of a great todo' },
      { title: 'todo 2', isClosed: true, description: 'Description of a great todo' },
    ]);

    mockFilteredTodosSelector = store.overrideSelector(filteredClosedTodos, [
      { title: 'todo 1', isClosed: false, description: 'Description of a great todo' },
      { title: 'todo 2', isClosed: true, description: 'Description of a great todo' },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-checkbox')).nativeElement.innerText).toEqual(
      'todo 1'
    );
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('mat-checkbox')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('mat-checkbox')).nativeElement.innerText).toContain('todo 2');
    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should line-through when todo is closed', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('.crossed'));
    expect(todoElements.length).toEqual(1);
    expect(todoElements[0]).toBeTruthy();
  });

  it('should line-through when todo is n0t closed', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].nativeElement.getAttribute('style')).toBeNull();
  });

  it('should test toggle checkbox', () => {
    const spyStoreDispatch = spyOn(store, 'dispatch');
    const todoElement = fixture.debugElement.query(By.css('mat-checkbox'));
    todoElement.triggerEventHandler('change', {});
    const selectedTodo = { todoTitle: 'todo 1', isClosed: false };
    expect(spyStoreDispatch).toHaveBeenCalledOnceWith(
      toggleTodoState(selectedTodo)
    );
  });
});
