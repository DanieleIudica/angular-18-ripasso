import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  value = signal(0);

  increment() {
    this.value.update((val) => val + 1);
  }
  decrement() {
    this.value.update((val) => val - 1);
  }
  reset() {
    this.value.set(0);
  }
}
