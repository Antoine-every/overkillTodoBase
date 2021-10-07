import { selectTodos } from '../store/selectors';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { Store } from '@ngrx/store';
import { loadTodos, toggleTodoState } from '../store/actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  selectedTodo!: Todo;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todos$.subscribe(todos => {
        this.selectedTodo = todos.filter(todo => todo.title === params.id)[0];
      });
    });
  }
}
