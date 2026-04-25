const {mysqlPool} = require('../config/mysql');

class Usuarios {
    static async obtenerTodos(){
        const [rows] = await mysqlPool.query (`
            SELECT 
                idUsuario,
                NombreCompleto,
                NombreUsuario,
                Contrasenia,
                Correo,
                NumTelefono,
                Tipo
            FROM Usuarios
            ORDER BY idUsuario ASC
        `);
        return rows
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

    static async crear(data) {
        const {
            NombreCompleto,
            NombreUsuario,
            Contrasenia,
            Correo,
            NumTelefono,
            Tipo
        } =data

        const [result] = await mysqlPool.query(`
            INSERT  INTO Usuarios ( 
                NombreCompleto, 
                NombreUsuario, 
                Contrasenia, 
                Correo, 
                NumTelefono,
                Tipo)
                VALUES(?,?,?,?,?,?)
                `,[NombreCompleto,NombreUsuario, Contrasenia,Correo, NumTelefono,Tipo]
        );

        return {
            idUsuario: result.insertId,
            NombreCompleto, 
            NombreUsuario, 
            Contrasenia, 
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
    static async login(NombreUsuario){
        const[rows] = await mysqlPool.query(`
            SELECT * FROM Usuarios
            WHERE NombreUsuario = ?
            `, [NombreUsuario]
        );
        return rows[0];
    }
}

class Usuario {
    static async obtenerPorCorreo(correo) {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE Correo = ? LIMIT 1',
            [correo]
        );

        return rows[0] || null;
    }
}

module.exports = Usuarios;
/*
FUNCIONES DE USUARIOS
--- Logueo 
--- BorrarCuenta
--- EditarDatos
FUNCIONES DE CLIENTE
--- CrearProyecto 
--- Salir
FUNCIONES DE PROYECTO
--- SubirUbicacionProyecto
--- SubirPlano
--- UbicarSucursal
--- CotizarPresupuesto
FUNCIONES DE SUCURSAL
--- CRUDmateriales
FUNCIONES DE MATERIAL_SUCURSAL
--- ConsultarPrecios
FUNCIONES DE MATERIAL
--- MostrarMaterialesDelSistema
FUNCIONES DE MATERIALES_PLANOS
--- MostrarCapasAnalizadas
*/