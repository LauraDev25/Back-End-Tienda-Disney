document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // `data` ahora tiene las propiedades correctas
        });

        const result = await response.json(); // Maneja la respuesta del servidor
        console.log(result);

        if (response.ok) {
            localStorage.setItem('token', result.token);
            alert('Inicio de sesión exitoso');
            window.location.href = 'pagina_protegida.html'; // Redirige si es necesario
        } else {
            alert(result.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la conexión, por favor intenta más tarde.');
    }
});

