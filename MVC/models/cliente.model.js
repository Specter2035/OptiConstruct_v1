
const { mysqlPool } = require('../config/mysql');

class Cliente {
    //obtener todos los clientes
    static async obtenerTodos (){
        const [rows] = await mysqlPool.query(`
            SELECT 
                IdCliente,
                NombreUsuario,
                IdUsuario_FK
            FROM Cliente
            ORDER BY IdCliente ASC`
        );
        return rows;
    }


     //obtener un cliente por id
    static async obtenerPorId(id) {
    const [rows] = await mysqlPool.query(`
        SELECT 
            IdCliente,
            NombreUsuario,
            IdUsuario_FK
        FROM Cliente
        WHERE IdCliente = ?`,
        [id]
    );

    return rows[0]; // solo un cliente
    }

    //crear cliente
    static async crear(data) {
        const {
            NombreUsuario,
            IdUsuario_FK
        } = data;

        
    const [result] = await mysqlPool.query(
        `INSERT INTO Cliente (
            NombreUsuario,
            IdUsuario_FK
            )
            VALUES (?, ?)`,
            [NombreUsuario, IdUsuario_FK]
        );

        return {
            IdCliente: result.insertId,
            NombreUsuario,
            IdUsuario_FK
        };
    }
}

module.exports = Cliente;


/*
--- */