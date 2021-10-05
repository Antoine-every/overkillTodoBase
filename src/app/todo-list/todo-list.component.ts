import { filteredClosedTodos, selectTodos } from './../store/selectors';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { loadTodos, toggleTodoState } from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  closeTodo$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos);
    this.closeTodo$ = this.store.select(filteredClosedTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleTodo(isClosed: boolean, todoTitle: string): void {
    this.store.dispatch(toggleTodoState({ isClosed, todoTitle }));
  }
}
