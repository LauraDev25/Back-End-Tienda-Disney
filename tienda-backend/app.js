const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Usuario, sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Función para autenticar el token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    jwt.verify(token, 'tu_secreto', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

// Ruta de registro
app.post('/api/register', async (req, res) => {
    const { nombre_usuario, correo_electronico, contrasena } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const usuario = await Usuario.create({
            nombre_usuario,
            correo_electronico,
            contrasena: hashedPassword,
        });
        res.status(201).json({ id: usuario.id, nombre_usuario: usuario.nombre_usuario });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
});

// Rutas protegidas con authenticateToken
app.get('/api/pi', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'P.I.html')); // Ruta a tu archivo HTML de la sección P.I
});

app.get('/api/el', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'E.L.html')); // Ruta a tu archivo HTML de la sección E.L
});

// Sincronizar y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Error al sincronizar la base de datos:", error);
});
