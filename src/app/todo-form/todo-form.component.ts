import { Todo } from './../models/todo';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() newTodo = new EventEmitter<Todo>();
  @Output() closeCreation = new EventEmitter<boolean>();

  formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    isClosed: [false],
    description: [''],
  });
  titleAlert = 'This field is required';

  constructor(private formBuilder: FormBuilder) { }

  onSubmit(todo: Todo): void {
    this.newTodo.emit(todo);
    this.closeNewTodo();
  }

  closeNewTodo(): void {
    this.closeCreation.emit(true);
  }
}
