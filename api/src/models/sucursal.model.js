const { mysqlPool } = require('../config/mysql');

class Sucursal {
    //obtener todas las sucursales
    static async obtenerTodos (){
        const [rows] = await mysqlPool.query(`
            SELECT 
                IdSucursal,
                NombreUsuario,
                IdUsuario_FK,
                Direccion,
                Lat,
                Lng
            FROM Sucursal
            ORDER BY IdSucursal ASC`
        );
        return rows;
    }


     //obtener un sucursal por id
    static async obtenerPorId(id) {
    const [rows] = await mysqlPool.query(`
        SELECT 
            IdSucursal,
            NombreUsuario,
            IdUsuario_FK,
            Direccion,
            Lat,
            Lng
        FROM Sucursal
        WHERE IdSucursal = ?`,
        [id]
    );

    return rows[0]; // solo una sucursal
}

//crear sucursal
static async crear(data) {
    const {
        NombreUsuario,
        IdUsuario_FK,
        Direccion,
        lat,
        Lng
    } = data;

    
const [result] = await mysqlPool.query(
    `INSERT INTO Sucursal (
        NombreUsuario,
        IdUsuario_FK,
        Direccion,
        Lat,
        Lng
        )
        VALUES (?, ?,?,?,?)`,
        [NombreUsuario, IdUsuario_FK, Direccion,lat,Lng]
    );

    return {
        IdSucursal: result.insertId,
        NombreUsuario,
        IdUsuario_FK,
        Direccion,
        Lat,
        Lng
    };
}
}

module.exports = Sucursal;
