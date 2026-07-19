# Cyberpunk Cat Platformer

Un videojuego web 2D de plataformas estilo retro contenido en un **ÚNICO ARCHIVO HTML**. Ambientado en un mundo Cyberpunk donde controlas a un gato robótico. No requiere dependencias, imágenes ni audios externos. Todo el renderizado se realiza mediante la API de Canvas de HTML5 (con efectos de neón y CRT) y los sonidos son generados proceduralmente con la Web Audio API.

## Características Principales

*   **Sin Dependencias:** Todo el código (HTML, CSS, JS) está embebido en `index.html`.
*   **Motor de Plataformas:** Implementa físicas de movimiento, saltos, gravedad y colisiones AABB (Axis-Aligned Bounding Box) con el entorno.
*   **Gráficos Procedurales:** Dibujo vectorial usando Canvas. Incluye un gato con animaciones de correr y saltar, fondos con efecto parallax (edificios de la ciudad), efecto de scanlines (CRT) y resplandor de neón.
*   **Audio Sintetizado:** Efectos de sonido (saltar, recolectar chips, pisotear enemigos, game over) generados dinámicamente con osciladores y ruido filtrado usando Web Audio API.
*   **Elementos del Juego:**
    *   **Jugador:** Un gato cyberpunk ágil.
    *   **Enemigos:** Drones de seguridad que patrullan las plataformas. Se pueden eliminar saltando sobre ellos.
    *   **Coleccionables:** Chips de datos esparcidos por el nivel que otorgan puntos.
    *   **Meta:** Alcanzar el terminal de "UPLINK" para completar el nivel.
*   **Sistema de Vidas:** Tienes 3 vidas. Si caes al vacío o chocas frontalmente con un dron, pierdes una.

## Controles

*   **Teclado:**
    *   `A` / `Flecha Izquierda`: Mover a la izquierda.
    *   `D` / `Flecha Derecha`: Mover a la derecha.
    *   `W` / `Flecha Arriba` / `Barra Espaciadora`: Saltar.
*   **Táctil (Dispositivos Móviles):**
    *   Usa los botones virtuales translúcidos en pantalla (D-Pad a la izquierda, botón de salto a la derecha).

## Arquitectura del Código

El juego está estructurado usando clases de ES6 dentro del script:

*   **AudioManager:** Gestiona y genera los sonidos retro usando `AudioContext`.
*   **Rect & Entity:** Clases base para el manejo de cajas de colisión y entidades móviles.
*   **Player:** Lógica específica del gato protagonista, animación, gravedad e input.
*   **Drone:** Inteligencia artificial simple para enemigos patrulleros.
*   **DataChip & Goal:** Entidades estáticas interactivas (coleccionables y meta del nivel).
*   **Particle:** Sistema de partículas simples para explosiones y recolección de objetos.
*   **Level:** Parsea un mapa basado en caracteres ASCII, genera las colisiones y dibuja el mapa (cajas cyberpunk).
*   **Game:** Bucle principal (`requestAnimationFrame`), control de estado (Jugando, Muerto, Game Over, Victoria), cámara con interpolación suave y dibujado de los fondos parallax.

## Ejecución

Al ser un archivo completamente estático, simplemente abre `index.html` en cualquier navegador web moderno.
