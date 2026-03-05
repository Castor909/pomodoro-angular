# Documentación Técnica - Aplicación Pomodoro

## Índice
1. [Arquitectura General](#arquitectura-general)
2. [Componentes](#componentes)
3. [Servicios](#servicios)
4. [Gestión de Estado con Signals](#gestión-de-estado-con-signals)
5. [Flujo de Datos](#flujo-de-datos)

## Arquitectura General

La aplicación sigue una arquitectura basada en componentes standalone de Angular 18, con separación clara de responsabilidades:

- **Servicios**: Contienen toda la lógica de negocio
- **Componentes**: Manejan únicamente la presentación y los eventos de usuario
- **Signals**: Gestión reactiva del estado

### Estructura de Archivos

```
src/app/
├── components/
│   ├── timer/
│   │   ├── timer.component.ts          # Componente de visualización del temporizador
│   │   ├── timer.component.html        # Template del temporizador
│   │   └── timer.component.css         # Estilos del temporizador
│   └── settings/
│       ├── settings.component.ts       # Componente de configuración
│       ├── settings.component.html     # Template de configuración
│       └── settings.component.css      # Estilos de configuración
├── services/
│   └── pomodoro.service.ts             # Servicio con lógica de negocio
├── app.component.ts                     # Componente raíz
├── app.component.html                   # Template principal
├── app.component.css                    # Estilos globales del app
└── app.config.ts                        # Configuración de la aplicación
```

## Componentes

### AppComponent
**Responsabilidad**: Componente raíz que orquesta la aplicación

**Características**:
- Componente standalone
- Importa TimerComponent y SettingsComponent
- Proporciona la estructura principal de la aplicación

**Código clave**:
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerComponent, SettingsComponent]
})
```

### TimerComponent
**Responsabilidad**: Visualizar el temporizador y controles principales

**Características**:
- Inyecta PomodoroService para acceder al estado
- No mantiene estado propio, solo consume signals del servicio
- Formatea el tiempo para visualización
- Maneja eventos de usuario (iniciar, pausar, reiniciar, saltar)

**Signals consumidos**:
- `minutes()`: Minutos restantes
- `seconds()`: Segundos restantes
- `isRunning()`: Estado de ejecución
- `isPaused()`: Estado de pausa
- `isIdle()`: Estado inactivo
- `currentMode()`: Modo actual (trabajo/descanso)
- `completedSessions()`: Contador de sesiones
- `progressPercentage()`: Porcentaje de progreso

**Métodos**:
```typescript
onStart(): void       // Inicia el temporizador
onPause(): void       // Pausa el temporizador
onResume(): void      // Reanuda el temporizador
onReset(): void       // Reinicia el temporizador
onSkip(): void        // Salta al siguiente ciclo
```

### SettingsComponent
**Responsabilidad**: Configurar duraciones y parámetros del temporizador

**Características**:
- Modal para configuración
- Usa FormsModule para two-way binding
- Mantiene estado local temporal hasta guardar
- Permite restablecer valores por defecto

**Signals locales**:
- `isOpen`: Controla la visibilidad del modal
- `workDuration`: Duración temporal del trabajo
- `shortBreakDuration`: Duración temporal del descanso corto
- `longBreakDuration`: Duración temporal del descanso largo
- `sessionsUntilLongBreak`: Sesiones hasta descanso largo

**Métodos**:
```typescript
toggleSettings(): void    // Abre/cierra el modal
onSave(): void           // Guarda la configuración
onCancel(): void         // Cancela y descarta cambios
onReset(): void          // Restablece valores por defecto
```

## Servicios

### PomodoroService
**Responsabilidad**: Gestión completa de la lógica del temporizador Pomodoro

**Características**:
- Injectable con `providedIn: 'root'` (singleton)
- Gestión de estado con Signals
- Control del temporizador con setInterval
- Manejo de ciclos de trabajo y descanso
- Notificaciones sonoras

#### Signals Privados (Estado Interno)

```typescript
_workDuration = signal(25)                  // Duración trabajo (min)
_shortBreakDuration = signal(5)             // Duración descanso corto (min)
_longBreakDuration = signal(15)             // Duración descanso largo (min)
_sessionsUntilLongBreak = signal(4)         // Sesiones hasta descanso largo
_timeRemaining = signal(25 * 60)            // Tiempo restante (segundos)
_timerStatus = signal<TimerStatus>('idle')  // Estado del temporizador
_currentMode = signal<TimerMode>('work')    // Modo actual
_completedSessions = signal(0)              // Sesiones completadas
```

#### Signals Públicos (Solo Lectura)

Los componentes acceden a versiones de solo lectura:
```typescript
readonly timeRemaining = this._timeRemaining.asReadonly()
readonly timerStatus = this._timerStatus.asReadonly()
readonly currentMode = this._currentMode.asReadonly()
readonly completedSessions = this._completedSessions.asReadonly()
```

#### Computed Signals

Valores derivados calculados automáticamente:
```typescript
minutes = computed(() => Math.floor(this._timeRemaining() / 60))
seconds = computed(() => this._timeRemaining() % 60)
isRunning = computed(() => this._timerStatus() === 'running')
isPaused = computed(() => this._timerStatus() === 'paused')
isIdle = computed(() => this._timerStatus() === 'idle')
progressPercentage = computed(() => { /* cálculo */ })
modeLabel = computed(() => { /* etiqueta según modo */ })
```

#### Métodos Públicos

**Gestión de Configuración**:
```typescript
updateSettings(settings: Partial<PomodoroSettings>): void
getSettings(): PomodoroSettings
```

**Control del Temporizador**:
```typescript
start(): void    // Inicia o reanuda el temporizador
pause(): void    // Pausa el temporizador
resume(): void   // Reanuda desde pausa
reset(): void    // Reinicia al valor inicial
skip(): void     // Salta al siguiente ciclo
```

#### Métodos Privados

```typescript
handleTimerComplete(): void           // Maneja la finalización del ciclo
switchMode(mode: TimerMode): void     // Cambia el modo (trabajo/descanso)
getTotalTimeForMode(mode): number     // Obtiene duración total por modo
playNotificationSound(): void         // Reproduce sonido de notificación
```

#### Effects

```typescript
effect(() => {
  // Detecta cuando el temporizador llega a 0 y está corriendo
  if (this._timeRemaining() === 0 && this._timerStatus() === 'running') {
    this.handleTimerComplete();
  }
});
```

## Gestión de Estado con Signals

### ¿Qué son los Signals?

Los Signals son una nueva primitiva de reactividad en Angular que proporciona:
- **Reactividad granular**: Solo se recalculan las partes que cambian
- **Mejor rendimiento**: Menos ciclos de detección de cambios
- **Código más limpio**: API simple y predecible

### Tipos de Signals en la Aplicación

#### 1. Writable Signals
Signals que pueden modificarse:
```typescript
const count = signal(0);
count.set(5);           // Establece valor
count.update(n => n + 1); // Actualiza basándose en valor anterior
```

#### 2. Computed Signals
Valores derivados que se recalculan automáticamente:
```typescript
const minutes = computed(() => Math.floor(timeRemaining() / 60));
```

#### 3. Read-only Signals
Signals expuestos solo para lectura:
```typescript
readonly timeRemaining = this._timeRemaining.asReadonly();
```

### Flujo de Reactividad

```
Usuario interactúa → Componente llama método del servicio
                ↓
        Servicio actualiza Signal
                ↓
        Computed signals se recalculan automáticamente
                ↓
        Vista se actualiza automáticamente
```

## Flujo de Datos

### Iniciar Sesión de Trabajo

```
1. Usuario presiona "Iniciar"
   ↓
2. TimerComponent.onStart()
   ↓
3. PomodoroService.start()
   - Si está idle: establece timeRemaining al total del modo actual
   - Cambia status a 'running'
   - Inicia setInterval que decrementa timeRemaining cada segundo
   ↓
4. Los computed signals se actualizan:
   - minutes() y seconds() recalculan
   - isRunning() retorna true
   - progressPercentage() se actualiza
   ↓
5. La vista se actualiza automáticamente mostrando:
   - Nuevo tiempo
   - Botón "Pausar" en lugar de "Iniciar"
   - Barra de progreso actualizada
```

### Completar un Ciclo

```
1. timeRemaining llega a 0 mientras está running
   ↓
2. Effect detecta el cambio → handleTimerComplete()
   ↓
3. Se detiene el temporizador
   ↓
4. Se reproduce sonido de notificación
   ↓
5. Si era modo 'work':
   - Incrementa completedSessions
   - Determina siguiente descanso (corto o largo)
   - Cambia a modo break correspondiente
   ↓
6. Si era modo break:
   - Cambia a modo 'work'
   ↓
7. Establece nuevo timeRemaining según el modo
   ↓
8. Status vuelve a 'idle'
   ↓
9. Vista se actualiza mostrando nuevo modo y tiempo
```

### Configurar Duración

```
1. Usuario abre modal de configuración
   ↓
2. SettingsComponent carga valores actuales del servicio
   ↓
3. SettingsComponent mantiene copia local (signals temporales)
   ↓
4. Usuario modifica valores con inputs (two-way binding)
   ↓
5. Usuario presiona "Guardar"
   ↓
6. SettingsComponent.onSave() llama updateSettings()
   ↓
7. PomodoroService actualiza sus signals de configuración
   ↓
8. Si timer está idle, se resetea con nuevos valores
   ↓
9. Modal se cierra
```

## Características Técnicas Destacadas

### Componentes Standalone
- No requieren NgModule
- Importaciones explícitas en cada componente
- Mejor tree-shaking
- Más fácil de mantener y probar

### Separación de Responsabilidades
- **Service**: Toda la lógica de negocio, estado y temporizador
- **Components**: Solo presentación y delegación de eventos
- **No hay lógica duplicada**: Los componentes son "tontos"

### Reactividad
- Estado centralizado en el servicio
- Componentes consumen signals de solo lectura
- Actualizaciones automáticas sin código adicional
- Effects para lógica derivada

### Tipado Fuerte
```typescript
type TimerMode = 'work' | 'shortBreak' | 'longBreak';
type TimerStatus = 'idle' | 'running' | 'paused';
interface PomodoroSettings { /* ... */ }
```

### Accesibilidad
- Etiquetas ARIA en botones
- Atributos `aria-label`
- Focus visible en elementos interactivos
- Estilos de contraste adecuados

### Diseño Responsivo
- Mobile-first approach
- Media queries para diferentes breakpoints
- Tipografía escalable
- Layout flexible con CSS Grid y Flexbox

## Posibles Mejoras Futuras

1. **Persistencia**: LocalStorage para guardar configuración y progreso
2. **Historial**: Registro de sesiones completadas por día
3. **Estadísticas**: Gráficos de productividad
4. **Notificaciones**: Notificaciones del navegador (Web Notifications API)
5. **Temas**: Selector de temas de color
6. **Sonidos personalizables**: Diferentes sonidos de notificación
7. **Tareas**: Lista de tareas asociadas a pomodoros
8. **PWA**: Convertir en Progressive Web App

## Conclusión

Esta aplicación demuestra las mejores prácticas de Angular 18:
- Uso efectivo de Signals para gestión de estado
- Componentes standalone modernos
- Separación clara de responsabilidades
- Código limpio y mantenible
- Diseño responsivo y accesible
