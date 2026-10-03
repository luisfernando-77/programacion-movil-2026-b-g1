# Semana 8 · API REST con Express

## API REST

Se creó una API REST con Express para la entidad tareas.

### GET /tareas

Permite listar las tareas registradas.

```text
http://localhost:3000/tareas
```

### POST /tareas

Permite crear una nueva tarea enviando un JSON como:

```json
{
  "titulo": "Nueva tarea de prueba"
}
```

## Pruebas

El endpoint `GET /tareas` fue probado en el navegador y devolvió las tareas en formato JSON.

El endpoint `POST /tareas` fue probado en Postman y devolvió una respuesta `201 Created` con la nueva tarea.

## Fetch

Se creó la función `listarTareas()` para consultar las tareas y la función `crearTarea()` para crear una nueva tarea.

Las dos funciones incluyen manejo de errores con `try`, `catch` y validación de `respuesta.ok`.