import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PomodoroService } from '../../services/pomodoro.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  protected pomodoroService = inject(PomodoroService);

  // Format numbers with leading zero
  protected formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  // Control methods
  protected onStart(): void {
    this.pomodoroService.start();
  }

  protected onPause(): void {
    this.pomodoroService.pause();
  }

  protected onResume(): void {
    this.pomodoroService.resume();
  }

  protected onReset(): void {
    this.pomodoroService.reset();
  }

  protected onSkip(): void {
    this.pomodoroService.skip();
  }

  // Computed CSS class for timer mode
  protected modeClass = computed(() => {
    const mode = this.pomodoroService.currentMode();
    return {
      'mode-work': mode === 'work',
      'mode-short-break': mode === 'shortBreak',
      'mode-long-break': mode === 'longBreak'
    };
  });
}
