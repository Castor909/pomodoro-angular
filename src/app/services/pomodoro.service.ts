import { Injectable, signal, computed, effect } from '@angular/core';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  // Settings signals
  private _workDuration = signal(25);
  private _shortBreakDuration = signal(5);
  private _longBreakDuration = signal(15);
  private _sessionsUntilLongBreak = signal(4);

  // Timer state signals
  private _timeRemaining = signal(25 * 60); // in seconds
  private _timerStatus = signal<TimerStatus>('idle');
  private _currentMode = signal<TimerMode>('work');
  private _completedSessions = signal(0);
  
  private intervalId: any = null;

  // Public computed signals
  readonly workDuration = this._workDuration.asReadonly();
  readonly shortBreakDuration = this._shortBreakDuration.asReadonly();
  readonly longBreakDuration = this._longBreakDuration.asReadonly();
  readonly sessionsUntilLongBreak = this._sessionsUntilLongBreak.asReadonly();
  
  readonly timeRemaining = this._timeRemaining.asReadonly();
  readonly timerStatus = this._timerStatus.asReadonly();
  readonly currentMode = this._currentMode.asReadonly();
  readonly completedSessions = this._completedSessions.asReadonly();

  // Computed values
  readonly minutes = computed(() => Math.floor(this._timeRemaining() / 60));
  readonly seconds = computed(() => this._timeRemaining() % 60);
  readonly isRunning = computed(() => this._timerStatus() === 'running');
  readonly isPaused = computed(() => this._timerStatus() === 'paused');
  readonly isIdle = computed(() => this._timerStatus() === 'idle');
  
  readonly progressPercentage = computed(() => {
    const total = this.getTotalTimeForMode(this._currentMode());
    return ((total - this._timeRemaining()) / total) * 100;
  });

  readonly modeLabel = computed(() => {
    switch (this._currentMode()) {
      case 'work':
        return 'Tiempo de Trabajo';
      case 'shortBreak':
        return 'Descanso Corto';
      case 'longBreak':
        return 'Descanso Largo';
    }
  });

  constructor() {
    // Effect to handle timer completion
    effect(() => {
      if (this._timeRemaining() === 0 && this._timerStatus() === 'running') {
        this.handleTimerComplete();
      }
    });
  }

  // Settings management
  updateSettings(settings: Partial<PomodoroSettings>): void {
    if (settings.workDuration !== undefined) {
      this._workDuration.set(settings.workDuration);
    }
    if (settings.shortBreakDuration !== undefined) {
      this._shortBreakDuration.set(settings.shortBreakDuration);
    }
    if (settings.longBreakDuration !== undefined) {
      this._longBreakDuration.set(settings.longBreakDuration);
    }
    if (settings.sessionsUntilLongBreak !== undefined) {
      this._sessionsUntilLongBreak.set(settings.sessionsUntilLongBreak);
    }

    // Reset timer if idle
    if (this._timerStatus() === 'idle') {
      this.reset();
    }
  }

  getSettings(): PomodoroSettings {
    return {
      workDuration: this._workDuration(),
      shortBreakDuration: this._shortBreakDuration(),
      longBreakDuration: this._longBreakDuration(),
      sessionsUntilLongBreak: this._sessionsUntilLongBreak()
    };
  }

  // Timer controls
  start(): void {
    if (this._timerStatus() === 'idle') {
      this._timeRemaining.set(this.getTotalTimeForMode(this._currentMode()));
    }

    this._timerStatus.set('running');
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (this._timeRemaining() > 0) {
        this._timeRemaining.update(time => time - 1);
      }
    }, 1000);
  }

  pause(): void {
    if (this._timerStatus() === 'running') {
      this._timerStatus.set('paused');
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }

  resume(): void {
    if (this._timerStatus() === 'paused') {
      this.start();
    }
  }

  reset(): void {
    this.pause();
    this._timerStatus.set('idle');
    this._timeRemaining.set(this.getTotalTimeForMode(this._currentMode()));
  }

  skip(): void {
    this.pause();
    this.handleTimerComplete();
  }

  // Private helper methods
  private handleTimerComplete(): void {
    this.pause();
    this.playNotificationSound();

    if (this._currentMode() === 'work') {
      this._completedSessions.update(count => count + 1);
      
      // Determine next break type
      if (this._completedSessions() % this._sessionsUntilLongBreak() === 0) {
        this.switchMode('longBreak');
      } else {
        this.switchMode('shortBreak');
      }
    } else {
      // After break, go back to work
      this.switchMode('work');
    }
  }

  private switchMode(mode: TimerMode): void {
    this._currentMode.set(mode);
    this._timeRemaining.set(this.getTotalTimeForMode(mode));
    this._timerStatus.set('idle');
  }

  private getTotalTimeForMode(mode: TimerMode): number {
    switch (mode) {
      case 'work':
        return this._workDuration() * 60;
      case 'shortBreak':
        return this._shortBreakDuration() * 60;
      case 'longBreak':
        return this._longBreakDuration() * 60;
    }
  }

  private playNotificationSound(): void {
    // Simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }

  // Cleanup
  destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
