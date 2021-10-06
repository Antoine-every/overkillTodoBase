import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MockComponents, MockedComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { TodoDetailComponent } from './todo-detail.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoDetailComponent,
        MockComponents(
          MatCheckbox,
          MatCardContent,
          MatCardTitle,
          MatIcon,
          MatCard
        ),
      ],
      imports: [MatRippleModule, FormsModule, RouterTestingModule],
      providers: [provideMockStore(), {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: 'todo 1' })
        }
      }],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { title: 'todo 1', isClosed: false, description: '' },
      { title: 'todo 2', isClosed: true, description: '' },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'todo 1'
    );
  });
});
