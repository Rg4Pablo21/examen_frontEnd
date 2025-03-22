document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-asistencia");
    const listaEstudiantes = document.getElementById("lista-estudiantes");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        if (!nombre) return alert("Por favor ingrese un nombre.");

        // Enviar datos al backend
        const response = await fetch("http://localhost:5000/api/asistencias", { // Ruta correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre }),
        });

        if (response.ok) {
            cargarLista();
            form.reset();
        } else {
            alert("Error al registrar la asistencia.");
        }
    });

    async function cargarLista() {
        try {
            const response = await fetch("http://localhost:5000/api/asistencias"); // Ruta correcta
            if (!response.ok) throw new Error("Error al cargar la lista");

            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Los datos no son un array");

            listaEstudiantes.innerHTML = "";
            data.forEach((estudiante) => {
                const li = document.createElement("li");
                li.textContent = estudiante.nombre;
                listaEstudiantes.appendChild(li);
            });
        } catch (error) {
            console.error(error.message);
            alert("Hubo un error al cargar la lista de asistencia.");
        }
    }

    cargarLista();
});
