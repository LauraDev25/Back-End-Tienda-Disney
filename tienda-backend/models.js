// models.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('usuarios', {
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const Producto = sequelize.define('productos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

const Pedido = sequelize.define('pedidos', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

// Relaciones
Usuario.hasMany(Pedido, { foreignKey: 'id_usuario' });
Pedido.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = { Usuario, Producto, Pedido, sequelize };
