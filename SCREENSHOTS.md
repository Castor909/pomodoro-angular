# Instrucciones para Capturar Screenshots

## Preparación

1. Asegúrate de que la aplicación esté corriendo:
   ```bash
   npm start
   ```

2. Abre el navegador en `http://localhost:4200/`

3. Usa las herramientas de desarrollo del navegador (F12) para simular diferentes dispositivos

## Capturas Recomendadas

### 1. Vista Principal - Idle
**Nombre**: `01-main-view-idle.png`
- Estado: Temporizador sin iniciar (25:00)
- Muestra: Botón "Iniciar", contador en 0, modo "Tiempo de Trabajo"

### 2. Temporizador en Ejecución
**Nombre**: `02-timer-running.png`
- Estado: Temporizador corriendo
- Tiempo mostrado: aproximadamente 20:30 para que se vea progreso
- Muestra: Botón "Pausar", barra de progreso parcialmente llena

### 3. Modal de Configuración
**Nombre**: `03-settings-modal.png`
- Abre el modal de configuración
- Muestra: Todos los controles de configuración visibles

### 4. Vista Móvil - Vertical
**Nombre**: `04-mobile-portrait.png`
- Usa Chrome DevTools → Toggle device toolbar
- Dispositivo: iPhone 12 Pro (390 x 844)
- Captura: Vista completa de la aplicación en móvil

### 5. Vista Móvil - Configuración
**Nombre**: `05-mobile-settings.png`
- Misma configuración móvil
- Modal de configuración abierto
- Muestra: Cómo se adapta el modal en pantalla pequeña

### 6. Descanso Corto
**Nombre**: `06-short-break.png`
- Estado: En modo "Descanso Corto"
- Nota el cambio de color de fondo (verde)
- Contador de sesiones: 1

### 7. Descanso Largo
**Nombre**: `07-long-break.png`
- Estado: En modo "Descanso Largo"
- Nota el cambio de color de fondo (azul)
- Contador de sesiones: 4

### 8. Vista Tablet
**Nombre**: `08-tablet-view.png`
- Dispositivo: iPad Air (820 x 1180)
- Muestra: Diseño adaptativo en tablet

## Herramientas Recomendadas

### Para Windows
- **Snipping Tool**: Win + Shift + S
- **Snagit**: Herramienta profesional de captura

### Para macOS
- **Screenshot**: Cmd + Shift + 4 (área seleccionada)
- **Screenshot**: Cmd + Shift + 3 (pantalla completa)

### Para Linux
- **Spectacle**: Herramienta de KDE
- **GNOME Screenshot**: Herramienta de GNOME
- **Flameshot**: Herramienta multiplataforma

### Desde el Navegador
- **Chrome DevTools**: 
  1. F12 → Toggle device toolbar
  2. Selecciona dispositivo
  3. Menú ⋮ → Capture screenshot
  
- **Firefox DevTools**:
  1. F12 → Responsive Design Mode
  2. Clic derecho → Take a screenshot

## Consejos para Capturas de Calidad

1. **Limpieza**: 
   - Cierra tabs innecesarias
   - Oculta bookmarks bar del navegador
   - Usa modo incógnito si quieres barra limpia

2. **Timing**:
   - Para capturas de timer en ejecución, ajusta el inspector y prepara la captura
   - Usa el botón de pausa si necesitas tiempo para preparar

3. **Resolución**:
   - Captura en resolución real (no zoom)
   - Formato PNG para mejor calidad
   - Si es muy grande, redimensiona manualmente después

4. **Consistencia**:
   - Usa el mismo navegador para todas las capturas
   - Mantén el mismo zoom level
   - Captura con las mismas dimensiones cuando sea posible

## Edición Opcional

Si quieres añadir anotaciones o flechas:
- **Canva**: Editor online gratuito
- **GIMP**: Editor de imagen open source
- **Photopea**: Editor online similar a Photoshop
- **Figma**: Para diseñadores

## Guardar las Capturas

Guarda todos los archivos en la carpeta `/screenshots/` del proyecto:

```bash
repos/pomodoro-angular/screenshots/
├── 01-main-view-idle.png
├── 02-timer-running.png
├── 03-settings-modal.png
├── 04-mobile-portrait.png
├── 05-mobile-settings.png
├── 06-short-break.png
├── 07-long-break.png
├── 08-tablet-view.png
└── README.md
```

## Actualizar el README

Una vez que tengas las capturas, puedes actualizar el README.md principal agregando una sección con las imágenes:

```markdown
## Capturas de Pantalla

### Vista Principal
![Vista Principal](./screenshots/01-main-view-idle.png)

### Temporizador en Ejecución
![Temporizador en Ejecución](./screenshots/02-timer-running.png)

### Configuración
![Configuración](./screenshots/03-settings-modal.png)

### Vista Móvil
![Vista Móvil](./screenshots/04-mobile-portrait.png)
```

---

¡Buena suerte con las capturas! 📸
