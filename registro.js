document.getElementById('registroForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        alert('Registro exitoso');
    } else {
        alert(result.message || 'Error al registrar el usuario');
    }
});
