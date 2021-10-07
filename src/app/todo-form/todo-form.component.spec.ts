import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MockComponents } from 'ng-mocks';

import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormBuilder],
      imports: [ReactiveFormsModule],
      declarations: [TodoFormComponent,
        MockComponents(
          MatButton,
          MatFormField,
          MatLabel,
        ),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should closeNewTodo and emit an event to parent', () => {
    const button = fixture.nativeElement.querySelector('#closeNewTodo');
    button.click();
    fixture.detectChanges();
  });

  it('should onSubmit and emit an event to parent', () => {
    // spy on event emitter
    spyOn(component.newTodo, 'emit');

    // trigger the click
    const button = fixture.nativeElement.querySelector('#submit');
    button.click();
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.newTodo.emit).toHaveBeenCalledWith({ isClosed: false, description: '', title: '' });
  });
});
