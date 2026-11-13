# Semana 11 – Rediseño UX de una pantalla

**Asignatura:** Programación Móvil  
**Proyecto:** FilaFácil  
**Actividad:** Semana 11, Corte 3

## Descripción

En esta actividad se presenta un rediseño de la pantalla de FilaFácil, una propuesta de aplicación para organizar turnos. El objetivo es que las personas puedan solicitar un turno y consultar su estado desde una interfaz sencilla, pensada para un teléfono.

Se trata de un **prototipo académico web con apariencia móvil**. Los datos son simulados y no se utiliza una API real.

## Antes y después

**Antes (`antes.html`):** se creó una pantalla básica de referencia para mostrar el punto de partida de esta actividad. Tenía botones sin una jerarquía clara, navegación poco organizada y no mostraba los estados de la consulta. **No es una captura de una versión anterior real de la app**, sino un ejemplo preparado para comparar los cambios.

**Después (`index.html`):** se organizó la pantalla con un título claro, un botón principal «Solicitar turno», pestañas para navegar entre Inicio, Mis turnos y Ayuda, y mensajes fáciles de entender.

| Aspecto | Antes (referencia) | Después (rediseño) |
|---|---|---|
| Acción principal | No destaca | Botón visible «Solicitar turno» |
| Navegación | Botones sueltos | Pestañas: Inicio, Mis turnos, Ayuda |
| Información | Poco organizada | Títulos, textos y resultados separados |
| Estados | Sin mensajes | Cargando, con datos, vacío y error |
| Accesibilidad | Sin revisión | Contraste, etiquetas y controles táctiles amplios |

## Estados implementados

1. **Cargando:** aparece el mensaje «Cargando...» durante una consulta simulada.
2. **Con datos:** aparece un turno de ejemplo (A-025), número de personas antes y estado.
3. **Vacío:** aparece un mensaje cuando no hay turnos.
4. **Error:** aparece un aviso y un botón para reintentar.

## Navegación y accesibilidad

Se eligió el patrón de **pestañas (tabs)**. La pantalla principal tiene una sola acción destacada: solicitar turno. Los botones y campos tienen una altura táctil mínima aproximada de 44 a 50 píxeles, y se usan textos oscuros sobre fondos claros para facilitar la lectura. También se agregaron etiquetas en los formularios, encabezados y avisos accesibles.

## Cómo ejecutar

1. Descarga o abre la carpeta `filafacil-ux`.
2. Abre el archivo `antes.html` en un navegador para ver la referencia inicial.
3. Abre `index.html` para ver el rediseño.
4. Presiona «Solicitar turno» y observa el mensaje de carga y el resultado.
5. En «Mis turnos», prueba los botones «Con datos», «Vacío» y «Error».

## Archivos

- `antes.html`: referencia inicial de comparación.
- `index.html`: pantalla rediseñada.
- `styles.css`: estilos y diseño adaptable.
- `script.js`: navegación y estados simulados.
- `README.md`: explicación del proceso.

## Conclusión

Con el rediseño, la pantalla resulta más fácil de usar porque permite encontrar la acción principal rápidamente, navegar entre secciones y entender qué ocurre al consultar un turno. También se mejoró el tamaño de los botones y la claridad de los mensajes.
