# Modelo de datos

La app tiene 4 entidades: **Usuario**, **Asignatura**, **Tarea** y **Recordatorio**.

## Usuario

| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| nombre | texto |
| correo | texto |
| fecha_registro | fecha |

## Asignatura

| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| nombre | texto |
| color | texto |
| usuario_id (FK → Usuario) | entero |

## Tarea

| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| titulo | texto |
| descripcion | texto |
| fecha_limite | fecha/hora |
| estado | texto (pendiente / completada) |
| asignatura_id (FK → Asignatura) | entero |
| usuario_id (FK → Usuario) | entero |

## Recordatorio

| Atributo | Tipo |
|---|---|
| id (PK) | entero |
| fecha_hora | fecha/hora |
| tarea_id (FK → Tarea) | entero |

## Relaciones

- **Usuario 1 — N Asignatura**: un usuario crea varias asignaturas.
- **Usuario 1 — N Tarea**: un usuario crea varias tareas.
- **Asignatura 1 — N Tarea**: una asignatura agrupa varias tareas.
- **Tarea 1 — N Recordatorio**: una tarea puede tener uno o varios recordatorios.

```text
Usuario (1) ───< (N) Asignatura (1) ───< (N) Tarea (1) ───< (N) Recordatorio
   │
   └───< (N) Tarea