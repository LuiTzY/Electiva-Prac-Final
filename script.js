document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const errorFields = ['title', 'description', 'status', 'person'];
    errorFields.forEach(field => document.getElementById(`${field}Error`).style.display = 'none');

    let valid = true;

    errorFields.forEach(field => {
        const fieldValue = document.getElementById(`task${capitalizeFirstLetter(field)}`).value.trim();
        if (!fieldValue) {
            document.getElementById(`${field}Error`).style.display = 'block';
            valid = false;
        }
    });

    if (valid) {
        alert('La tarea se guardó con éxito');
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
