const sequelize = new Sequelize('tienda_online', 'root', '', {
    host: '127.0.0.1', // Cambiado a 127.0.0.1
    dialect: 'mysql',
    port: 3306,
});

// Verificar conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();

module.exports = sequelize;

