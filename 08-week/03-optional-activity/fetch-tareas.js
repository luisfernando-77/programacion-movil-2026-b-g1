async function listarTareas() {
  try {
    const respuesta = await fetch('http://localhost:3000/tareas');

    if (!respuesta.ok) {
      throw new Error('Error al listar las tareas');
    }

    const tareas = await respuesta.json();
    console.log(tareas);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function crearTarea(titulo) {
  try {
    const respuesta = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo })
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la tarea');
    }

    const tarea = await respuesta.json();
    console.log(tarea);
  } catch (error) {
    console.error('Error:', error.message);
  }
}