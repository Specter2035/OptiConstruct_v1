const {mysqlPool} = require('../config/mysql');

class Sucursal {
    static async crear(data) {
        const {
            NombreUsuario , 
            IdUsuario_FK,
            Direccion,
            Lat,
            Lng
        } =data

        const [result] = await mysqlPool.query(`
        INSERT  INTO Sucursal (
        NombreUsuario, 
        IdUsuario_FK,
        Direccion,
        Lat,
        Lng)
        VALUES(?,?,?,?,?)
        `,[NombreUsuario,IdUsuario_FK, Direccion,Lat,Lng]
        );

        return {
            idSucursal: result.insertId,
            NombreUsuario , 
            IdUsuario_FK,
            Direccion,
            Lat,
            Lng   
        };
    }
    static async obtenerTodos(){
        const [rows] = await mysqlPool.query(`
            SELECT 
                IdSucursal,
                NombreUsuario,
                IdUsuario_FK,
                Lat,
                Lng
            FROM Sucursal
            ORDER BY IdSucursal ASC`
        );
        return rows;
    }
    static async obtenerPorId(id){
        const [rows] = await mysqlPool.query(`
            SELECT 
                IdSucursal,
                NombreUsuario,
                IdUsuario_FK
            FROM Sucursal
            WHERE IdSucursal = ?`,
            [id]
        );
        return rows[0];
    }
}

module.exports = Sucursal;