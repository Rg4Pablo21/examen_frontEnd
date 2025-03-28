const enviarAsistencia = async () => {
    let alumno_nombre = document.getElementById('alumno_nombre').value.trim();
    const fecha = document.getElementById('fecha').value;
    const estado = document.getElementById('estado').value;

    if (!alumno_nombre || !fecha || !estado) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/asistencia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ alumno_nombre, fecha, estado })
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            let errorData;
            if (contentType && contentType.includes("application/json")) {
                errorData = await response.json();
            } else {
                errorData = { error: "Error desconocido en el servidor" };
            }
            throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        alert(data.mensaje);
        agregarFilaATabla(alumno_nombre, fecha, estado);
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Hubo un error al registrar la asistencia. Detalles: ' + error.message);
    }
};

const agregarFilaATabla = (nombre, fecha, estado) => {
    const tabla = document.querySelector("#tabla-asistencia tbody");
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${nombre}</td><td>${fecha}</td><td>${estado}</td>`;
    tabla.appendChild(fila);
};

document.getElementById('formularioAsistencia').addEventListener('submit', (e) => {
    e.preventDefault();
    enviarAsistencia();
});
