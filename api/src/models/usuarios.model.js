const { mysqlPool } = require('../config/mysql');
const bcrypt = require('bcryptjs');


class Usuario {
    //obtener todos los usuarios
    static async obtenerTodos (){
        const [rows] = await mysqlPool.query(`
            SELECT 
                IdUsuario,
                NombreCompleto,
                NombreUsuario,
                Contrasenia,
                Correo,
                NumTelefono,
                Tipo
            FROM Usuarios
            ORDER BY IdUsuario ASC`
        );
        return rows;
    }

     //obtener un usuario por id
    static async obtenerPorId(id) {
    const [rows] = await mysqlPool.query(`
        SELECT 
            NombreCompleto,
            NombreUsuario,
            Contrasenia,
            Correo,
            NumTelefono,
            Tipo
        FROM Usuarios
        WHERE IdUsuario = ?`,
        [id]
    );

    return rows[0]; // solo un usuario

   }

   //obtener un usuario por correo
    static async obtenerPorCorreo(Correo) {
    const [rows] = await mysqlPool.query(`
        SELECT 
            IdUsuario,
            NombreCompleto,
            NombreUsuario,
            Contrasenia,
            Correo,
            NumTelefono,
            Tipo
        FROM Usuarios
        WHERE Correo = ?`,
        [Correo]
    );

        return rows[0]; // solo un usuario


    }
    
//crear usuario
static async crear(data) {
    const {
        NombreCompleto,
        NombreUsuario,
        Contrasenia,
        Correo,
        NumTelefono,
        Tipo
    } = data;

     // encriptar contraseña
    const hash = await bcrypt.hash(Contrasenia, 10);
    
    const [result] = await mysqlPool.query(
        `INSERT INTO Usuarios (
            NombreCompleto,
            NombreUsuario,
            Contrasenia,
            Correo,
            NumTelefono,
            Tipo
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [NombreCompleto,NombreUsuario, hash,Correo, NumTelefono, Tipo ] /////////////////////////AQUI HASH
        );

    return {
        IdUsuario: result.insertId,
        NombreCompleto,
        NombreUsuario,
        Correo,
        NumTelefono,
        Tipo
    };
}

static async actualizar(id, data) {
    const {
        NombreCompleto,
        NombreUsuario,
        Contrasenia,
        Correo,
        NumTelefono,
        Tipo
    } = data;

    const [result] = await mysqlPool.query(`
        UPDATE Usuarios SET
            NombreCompleto = ?,
            NombreUsuario = ?,
            Contrasenia = ?,
            Correo = ?,
            NumTelefono = ?,
            Tipo = ?
        WHERE IdUsuario = ?
    `, [NombreCompleto,NombreUsuario,Contrasenia,Correo,NumTelefono,Tipo,id]);

    return result.affectedRows > 0; // true si sí actualizó
}
/*
    static async login(NombreUsuario){
            const[rows] = await mysqlPool.query(`
                SELECT * FROM Usuarios
                WHERE NombreUsuario = ?
                `, [NombreUsuario]
            );
            return rows[0];
        }*/
}

module.exports = Usuario;
