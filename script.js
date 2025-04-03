document.addEventListener("DOMContentLoaded", function () {
    fetchTasks(); // Cargar tareas al inicio
});

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const errorFields = ["title", "description", "status", "person"];
    errorFields.forEach(field => document.getElementById(`${field}Error`).style.display = "none");

    let valid = true;
    let taskData = {};

    errorFields.forEach(field => {
        const input = document.getElementById(`task${capitalizeFirstLetter(field)}`);
        const value = input.value.trim();
        if (!value) {
            document.getElementById(`${field}Error`).style.display = "block";
            valid = false;
        }
        taskData[field] = value;
    });

    if (!valid) return;

    // Enviar datos a la API
    fetch("http://localhost:3000/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(() => {
        alert("La tarea se guardó con éxito");
        document.getElementById("taskForm").reset();
        fetchTasks(); // Actualizar la lista de tareas
    })
    .catch(error => console.error("Error al agregar la tarea:", error));
});

function fetchTasks() {
    fetch("http://localhost:3000/tareas")
    .then(response => response.json())
    .then(tasks => {
        const tasksContainer = document.getElementById("tasksContainer");
        tasksContainer.innerHTML = ""; // Limpiar lista

        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item");
            taskItem.innerHTML = `
                <h5>${task.titulo}</h5>
                <p>${task.descripcion}</p>
                <span class="badge bg-info">${task.estado}</span>
                <small class="d-block">Asignado a: ${task.asignado}</small>
            `;
            tasksContainer.appendChild(taskItem);
        });
    })
    .catch(error => console.error("Error al obtener las tareas:", error));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}