# Guía de Uso - Temporizador Pomodoro

## Acceso a la Aplicación

Una vez que la aplicación está corriendo en `http://localhost:4200/`, verás la interfaz principal del temporizador.

## Interfaz Principal

### Elementos de la Pantalla

1. **Título**: "🍅 Temporizador Pomodoro"
2. **Subtítulo**: "Gestiona tu tiempo con la técnica Pomodoro"
3. **Indicador de Modo**: Muestra si estás en "Tiempo de Trabajo" o "Descanso"
4. **Contador de Sesiones**: Muestra cuántas sesiones Pomodoro has completado
5. **Temporizador**: Visualización grande del tiempo restante (MM:SS)
6. **Barra de Progreso**: Indica visualmente cuánto tiempo ha transcurrido
7. **Botones de Control**: Iniciar, Pausar, Reiniciar, Saltar
8. **Botón de Configuración**: Acceso a las opciones

## Uso Básico

### Primera Sesión

1. **Iniciar**: Al abrir la aplicación, verás el temporizador en 25:00 (25 minutos)
2. Haz clic en el botón **"Iniciar"** para comenzar tu primera sesión de trabajo
3. El temporizador comenzará a contar hacia atrás
4. El botón cambiará a **"Pausar"** y aparecerán los botones "Reiniciar" y "Saltar"
5. La barra de progreso se llenará gradualmente
6. El fondo cambiará a un tono rojizo durante el trabajo

### Durante una Sesión

**Pausar**: Si necesitas interrumpir temporalmente, haz clic en **"Pausar"**
- El temporizador se detendrá
- El botón cambiará a **"Reanudar"**
- Puedes reanudar en cualquier momento

**Reanudar**: Haz clic en **"Reanudar"** para continuar desde donde lo dejaste

**Reiniciar**: Haz clic en **"Reiniciar"** para volver al tiempo inicial del modo actual

**Saltar**: Haz clic en **"Saltar"** para avanzar inmediatamente al siguiente ciclo

### Finalizar una Sesión

Cuando el temporizador llegue a 00:00:

1. Escucharás un **sonido de notificación**
2. El temporizador se detendrá automáticamente
3. **Si era una sesión de trabajo**:
   - El contador de sesiones aumentará en 1
   - Automáticamente cambiará a modo "Descanso Corto" (5 min) o "Descanso Largo" (15 min)
   - El fondo cambiará a verde (descanso corto) o azul (descanso largo)
4. **Si era un descanso**:
   - Automáticamente cambiará a modo "Tiempo de Trabajo"
   - El fondo volverá al tono rojizo

## Ciclo Completo Pomodoro

Un ciclo completo típico sigue este patrón:

```
1. Trabajo (25 min) → Descanso Corto (5 min)
2. Trabajo (25 min) → Descanso Corto (5 min)
3. Trabajo (25 min) → Descanso Corto (5 min)
4. Trabajo (25 min) → Descanso Largo (15 min)
   [Ciclo se repite]
```

## Configuración Personalizada

### Abrir Configuración

1. Haz clic en el botón **"⚙️ Configuración"** (debajo del temporizador)
2. Se abrirá un modal con las opciones

### Opciones Disponibles

**Duración del Trabajo**
- Minutos por sesión de trabajo
- Rango: 1-60 minutos
- Por defecto: 25 minutos

**Descanso Corto**
- Minutos de descanso entre sesiones normales
- Rango: 1-30 minutos
- Por defecto: 5 minutos

**Descanso Largo**
- Minutos de descanso después de completar múltiples sesiones
- Rango: 1-60 minutos
- Por defecto: 15 minutos

**Sesiones hasta Descanso Largo**
- Cuántas sesiones de trabajo completar antes del descanso largo
- Rango: 1-10 sesiones
- Por defecto: 4 sesiones

### Guardar Configuración

1. Ajusta los valores usando los campos numéricos
2. Haz clic en **"Guardar"** para aplicar los cambios
3. Haz clic en **"Cancelar"** para cerrar sin guardar
4. Haz clic en **"Restablecer"** para volver a los valores por defecto (25/5/15/4)

**Nota**: Si el temporizador está detenido (idle), se actualizará automáticamente con la nueva configuración.

## Colores por Modo

La aplicación usa colores para ayudarte a identificar el modo actual:

- 🔴 **Rojo**: Tiempo de Trabajo (enfoque)
- 🟢 **Verde**: Descanso Corto (pausa breve)
- 🔵 **Azul**: Descanso Largo (pausa extendida)

## Consejos de Uso

### Maximiza tu Productividad

1. **Durante el Trabajo**:
   - Elimina distracciones
   - Enfócate en una sola tarea
   - No revises email o redes sociales
   - Anota interrupciones pero continúa

2. **Durante los Descansos**:
   - Levántate de tu silla
   - Estira el cuerpo
   - Descansa la vista
   - No sigas trabajando

3. **Planificación**:
   - Decide tu tarea antes de iniciar el pomodoro
   - Estima cuántos pomodoros necesitarás
   - Revisa tu progreso al final del día

### Personalización Recomendada

**Para principiantes**:
- Mantén los valores por defecto (25/5/15)
- Completa al menos 2-3 pomodoros por día

**Para tareas cortas**:
- Reduce a 15 minutos de trabajo
- 3 minutos de descanso corto

**Para sesiones intensas**:
- Aumenta a 45 minutos de trabajo
- 10 minutos de descanso corto
- 20 minutos de descanso largo

**Para estudio**:
- 50 minutos de trabajo (como una clase)
- 10 minutos de descanso

## Uso en Dispositivos Móviles

La aplicación es completamente responsiva:

### Móvil (pantallas pequeñas)
- El diseño se adapta automáticamente
- Los botones se reorganizan verticalmente
- El temporizador se mantiene legible
- El modal de configuración ocupa toda la pantalla

### Tablet
- Diseño optimizado para pantallas medianas
- Todos los controles accesibles fácilmente

### Recomendaciones Móviles
- Mantén la pantalla encendida durante las sesiones
- Usa auriculares para escuchar las notificaciones
- Considera agregar la app a tu pantalla de inicio (si es PWA en el futuro)

## Atajos de Teclado

Actualmente la aplicación se controla mediante clicks/taps. En futuras versiones podrían añadirse:
- `Espacio`: Iniciar/Pausar
- `R`: Reiniciar
- `S`: Saltar
- `C`: Configuración

## Solución de Problemas

### El sonido no suena
- Verifica el volumen de tu dispositivo
- Asegúrate de que el navegador tenga permisos de audio
- Algunos navegadores bloquean audio hasta que el usuario interactúe con la página

### El temporizador no se actualiza visualmente
- Verifica que no tengas el tab en segundo plano (algunos navegadores reducen recursos)
- Recarga la página (F5 o Cmd+R)

### La configuración no se guarda
- Los cambios se pierden al recargar (no hay persistencia aún)
- Asegúrate de hacer clic en "Guardar" no en "Cancelar"

### El temporizador salta o se congela
- Verifica tu conexión a internet (si usas SSR)
- Cierra otras tabs que consuman muchos recursos
- Recarga la aplicación

## Privacidad y Datos

- ⚠️ **Sin persistencia**: Actualmente, todos los datos se pierden al recargar
- 🔒 **Sin seguimiento**: No se recopilan datos de uso
- 💾 **Local**: Todo funciona en tu navegador, sin enviar datos a servidores

## Próximas Funcionalidades

Posibles mejoras futuras:
- ✨ Guardar configuración en LocalStorage
- 📊 Estadísticas de productividad
- 📝 Lista de tareas integrada
- 🔔 Notificaciones del navegador
- 🎨 Temas de color personalizables
- 📱 PWA para instalación en móvil
- ⌨️ Atajos de teclado
- 🔊 Sonidos de notificación personalizables

---

## ¿Necesitas Ayuda?

Si encuentras algún problema o tienes sugerencias, consulta:
- La documentación técnica en `DOCUMENTATION.md`
- El README principal en `README.md`
- El código fuente en `src/`

¡Disfruta tu experiencia con el Temporizador Pomodoro! 🍅⏱️
