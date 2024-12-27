import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [GreetingComponent, CounterComponent],
})
export class HomeComponent {
  homeMessage = signal('hello from home to greeting component');
  inputValue = signal('');
  keyUpHandler(e: any) {
    console.log('🚀 [ INFO] >> :', e.target.value);
    // if (!e.target.value) return
    // const
    // if
    this.inputValue.update((value) => (value = e.target.value));
  }
}
