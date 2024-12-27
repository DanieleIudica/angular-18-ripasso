import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.types';
import { catchError, delay } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  // service injection
  todoSrv = inject(TodosService);

  todoItems = signal<Array<Todo>>([]);
  isLoading = signal<boolean>(true);
  searchTerm = signal('');

  ngOnInit(): void {
    // with fake data:
    // console.log('🚀 [ TODOS] >> :', this.todoSrv.todoItems);
    // assegno l'array che arriva dal service a un signal
    // this.todoItems.set(this.todoSrv.todoItems);

    // whit api call
    this.todoSrv
      .getTodosFromApi()
      .pipe(
        catchError((e) => {
          console.log('e :>> ', e);
          throw e;
        }),
        delay(1000) // Aggiunge un ritardo di 1 secondo
      )
      .subscribe({
        next: (todos) => {
          this.todoItems.set(todos);
          this.isLoading.set(false); // Aggiorna lo stato di caricamento
        },
        error: (err) => {
          console.error('Errore:', err);
          this.isLoading.set(false); // Gestisci lo stato in caso di errore
        },
      });
  }

  updateTodo(todoItem: Todo) {
    this.todoItems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todo, completed: !todoItem.completed };
        }
        return todo;
      });
    });
  }
}
