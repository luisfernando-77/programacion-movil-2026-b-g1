# FilaFácil – Semana 14: Optimización y pruebas

Actividad opcional de Programación Móvil – Corte 3.

## 1. Objetivo

Optimizar la pantalla de **Mis turnos** de FilaFácil, mejorando el rendimiento al mostrar los registros y realizando dos pruebas unitarias para comprobar el funcionamiento de las funciones utilizadas.

## 2. Tecnologías utilizadas

- HTML5: estructura de la aplicación.
- CSS3: diseño visual adaptable a dispositivos móviles.
- JavaScript: funcionamiento, búsqueda y optimización.
- Node.js: ejecución del servidor y las pruebas unitarias.

## 3. Cómo ejecutar el proyecto

1. Abrir Visual Studio Code.
2. Abrir una terminal dentro de la carpeta `filafacil-optimizacion`.
3. Ejecutar el comando:

   `npm start`

4. Abrir el navegador e ingresar a `http://localhost:3000`.
5. Probar las opciones **Antes**, **Después (mejorado)** y **Medir rendimiento**.

Para ejecutar las pruebas unitarias:

`npm test`

## 4. Optimización realizada

Se trabajó en la pantalla **Mis turnos**, que contiene 650 registros de demostración.

**Antes de la optimización:**

- Se procesaban nuevamente los textos durante las búsquedas.
- Se generaban todos los elementos de la lista.
- La pantalla debía mostrar una mayor cantidad de registros al mismo tiempo.

**Después de la optimización:**

- Se preparan los textos de búsqueda una sola vez.
- Se muestran inicialmente 25 turnos.
- Se utiliza el botón **Mostrar más** para cargar otros registros.
- Se utiliza `DocumentFragment` para organizar mejor la creación de elementos.

Con estos cambios se busca reducir el trabajo inicial del navegador y mejorar la visualización de la lista.

## 5. Medición de rendimiento

Para comparar ambas versiones se utiliza `performance.now()`, realizando siete mediciones y calculando el tiempo promedio.

| Versión | Tiempo promedio |
|---|---|
| Antes | Pendiente de registrar |
| Después | Pendiente de registrar |

**Análisis:**

La versión optimizada busca disminuir el tiempo de procesamiento inicial, porque muestra solamente los primeros 25 registros en lugar de generar toda la lista.

Los tiempos exactos dependen del navegador y del computador utilizado. La comparación debe completarse con los resultados obtenidos al ejecutar la medición.

## 6. Pruebas unitarias

Se implementaron dos pruebas unitarias utilizando Node.js.

**Prueba 1: formatearTurno**

Comprueba que los números de los turnos se presenten correctamente, agregando ceros cuando sea necesario.

Ejemplos:

- 7 → T-007
- 125 → T-125

**Prueba 2: contarPendientes**

Comprueba que la aplicación cuente únicamente los turnos cuyo estado es pendiente.

### Resultados obtenidos

Las pruebas se ejecutaron mediante el comando `npm test`.

| Resultado | Cantidad |
|---|---:|
| Pruebas ejecutadas | 2 |
| Pruebas aprobadas | 2 |
| Pruebas fallidas | 0 |
| Pruebas omitidas | 0 |

**Conclusión:** las dos pruebas unitarias finalizaron correctamente, confirmando el comportamiento esperado de las funciones evaluadas.

## 7. Evidencias

Dentro de la carpeta `evidencias/` se incluyen:

- `01-rendimiento.png`: captura de la comparación de rendimiento antes y después.
- `02-pruebas-unitarias.png`: captura de la terminal con las dos pruebas aprobadas.

## 8. Conclusión

Durante esta actividad se aplicaron mejoras a la pantalla de turnos de FilaFácil, utilizando paginación y evitando procesamientos innecesarios.

También se realizaron dos pruebas unitarias para comprobar funciones importantes de la aplicación, obteniendo dos resultados satisfactorios y ninguna prueba fallida.

Esta actividad permitió comprender la importancia de optimizar las aplicaciones y comprobar su funcionamiento mediante pruebas.

## 9. Observaciones

Los turnos utilizados son datos de demostración.

FilaFácil está desarrollado como un prototipo web adaptable a dispositivos móviles, utilizando HTML, CSS, JavaScript y Node.js.