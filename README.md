# Slingshot Physics Puzzle

Un videojuego web 2D tipo "slingshot physics puzzle" (rompecabezas físico con resortera) contenido en un **ÚNICO ARCHIVO HTML**. No requiere dependencias, imágenes ni audios externos. Todo el renderizado se realiza mediante la API de Canvas de HTML5 y los sonidos son generados proceduralmente con la Web Audio API.

## Características Principales

*   **Sin Dependencias:** Todo el código (HTML, CSS, JS) está embebido en `index.html`.
*   **Motor de Física Propio:** Implementa físicas de cuerpos rígidos en 2D (colisiones Círculo-Círculo, Círculo-Rectángulo, Rectángulo-Rectángulo vía SAT simplificado), gravedad, fricción, restitución y un sistema iterativo de resolución de impulsos.
*   **Generación Procedural de Audio:** Efectos de sonido creados al vuelo con osciladores (Web Audio API) para estiramientos, lanzamientos, impactos y explosiones.
*   **Sistema de Partículas:** Efectos visuales de astillas, polvo y cristales rotos generados por el motor de Canvas.
*   **Auto-Play (IA Básica):** Un modo automático que calcula parábolas y lanza los pájaros hacia el objetivo más cercano de forma autónoma.
*   **Materiales y Daño:** Diferentes comportamientos según el material del bloque (Madera, Piedra, Vidrio) con distintos niveles de resistencia y generación de daño por impulsos.
*   **Mecánicas de Pájaros:**
    *   **Rojo:** Proyectil estándar.
    *   **Amarillo:** Habilidad de impulso (Dash) al hacer clic en el aire.
    *   **Negro:** Habilidad de explosión en área de efecto al hacer clic en el aire.

## Controles

*   **Mouse / Táctil:**
    *   Arrastra desde la resortera hacia atrás para tensar y apuntar. Suelta para lanzar.
    *   Haz clic en la pantalla mientras un pájaro amarillo o negro está en vuelo para activar su habilidad especial.
*   **Teclado:**
    *   `R`: Reiniciar el nivel actual.
    *   `N`: Ir al siguiente nivel.
*   **Interfaz (UI):**
    *   Botón **Pausa (⏸)**: Detiene el motor de físicas.
    *   Botón **Reiniciar (↻)**: Reinicia el nivel.
    *   Botón **Sonido (🔊)**: Alterna el volumen (Mute/Unmute).
    *   Botón **AUTO**: Activa o desactiva la IA de auto-juego.

## Arquitectura del Código

El juego está estructurado en módulos orientados a objetos, separados en las siguientes clases:

*   **Vec2 & Mat22:** Clases utilitarias de álgebra lineal para vectores 2D y matrices de rotación.
*   **Body:** Representa un objeto físico en el mundo (Círculo o Rectángulo). Contiene propiedades de posición, velocidad, masa, inercia, vida, material y estado de reposo (sleeping).
*   **PhysicsWorld:** Contenedor de cuerpos físicos. Maneja la integración del tiempo (Timestep Fijo) y detecta posibles colisiones.
*   **Collide:** Funciones matemáticas para la detección de colisiones puras devolviendo Manifolds (puntos de contacto, normal, penetración).
*   **Solver:** Resolutor de impulsos iterativo que aplica las fuerzas de colisión, fricción y corrección posicional a los cuerpos.
*   **Slingshot:** Maneja la lógica de la resortera, la interacción de arrastre, el cálculo de trayectoria y la visualización.
*   **Camera:** Implementa un seguimiento suave (Lerp) de la cámara detrás del pájaro en vuelo.
*   **ParticleSystem:** Gestiona los emisores de partículas para efectos visuales temporales de impacto.
*   **AudioManager:** Administra la creación y reproducción de sonidos generados vía `AudioContext`.
*   **LevelManager:** Estructura que almacena y provee los datos JSON predefinidos para la construcción de cada nivel (pájaros, bloques y cerdos).
*   **Game:** El bucle principal del juego (`requestAnimationFrame`). Maneja los estados de la partida, la entrada del usuario, la UI y orquesta los diferentes sistemas (Cámara, Física, Partículas, Audio).

## Ejecución

Al ser un archivo completamente estático, simplemente abre `index.html` en cualquier navegador web moderno.
