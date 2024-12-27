import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.types';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo.directive';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [HighlightCompletedTodoDirective, TitleCasePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>({});
  todoToggled = output<Todo>();

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }
}
