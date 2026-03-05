import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PomodoroService, PomodoroSettings } from '../../services/pomodoro.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  private pomodoroService = inject(PomodoroService);
  
  protected isOpen = signal(false);
  protected workDuration = signal(25);
  protected shortBreakDuration = signal(5);
  protected longBreakDuration = signal(15);
  protected sessionsUntilLongBreak = signal(4);

  constructor() {
    this.loadSettings();
  }

  protected toggleSettings(): void {
    this.isOpen.update(value => !value);
    if (this.isOpen()) {
      this.loadSettings();
    }
  }

  protected onSave(): void {
    const settings: PomodoroSettings = {
      workDuration: this.workDuration(),
      shortBreakDuration: this.shortBreakDuration(),
      longBreakDuration: this.longBreakDuration(),
      sessionsUntilLongBreak: this.sessionsUntilLongBreak()
    };

    this.pomodoroService.updateSettings(settings);
    this.isOpen.set(false);
  }

  protected onCancel(): void {
    this.loadSettings();
    this.isOpen.set(false);
  }

  protected onReset(): void {
    this.workDuration.set(25);
    this.shortBreakDuration.set(5);
    this.longBreakDuration.set(15);
    this.sessionsUntilLongBreak.set(4);
  }

  private loadSettings(): void {
    const settings = this.pomodoroService.getSettings();
    this.workDuration.set(settings.workDuration);
    this.shortBreakDuration.set(settings.shortBreakDuration);
    this.longBreakDuration.set(settings.longBreakDuration);
    this.sessionsUntilLongBreak.set(settings.sessionsUntilLongBreak);
  }
}
