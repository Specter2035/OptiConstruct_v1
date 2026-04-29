const { mysqlPool } = require("../config/mysql");

class MaterialSucursal {

    static async crearMaterialSucursal(data)
    {
        const{
            Nombre_M,
            PrecioBase,
            Cantidad,
            IdSucursal_FK
        } = data;

        //update
        const[result] = await mysqlPool.query(`
            INSERT INTO Material_Sucursal (
            Nombre_M, 
            PrecioBase, 
            Cantidad, 
            IdSucursal_FK
            )
            VALUES (?, ?, ?, ?)
            `, [Nombre_M, PrecioBase, Cantidad, IdSucursal_FK]);

        return {
            IdMaterial_S: result.insertId,
            Nombre_M,
            PrecioBase,
            Cantidad,
            IdSucursal_FK
        };
    }

    static async actualizarMaterialSucursal(id, data)
    {
        const {
            Nombre_M,
            PrecioBase,
            Cantidad, 
            IdSucursal_FK
        } = data;

        //Actualizar tabla de materialSucursal
        const[result] = await mysqlPool.query(`
                UPDATE Material_Sucursal
                SET
                Nombre_M = ?, 
                PrecioBase = ?,
                Cantidad = ?,
                IdSucursal_FK = ?
                
                WHERE IdMaterial_S = ?
            `, [Nombre_M, PrecioBase, Cantidad, IdSucursal_FK, id]);

            return result.affectedRows > 0;
    }

    // Búsqueda de todos los registros
    static async obtenerTodos() {
        const [rows] = await mysqlPool.query('SELECT * FROM Material_Sucursal');
         return rows;
    }

    static async obtenerPreciosPorSucursalYMateriales(idSucursal, idsMateriales) {
        if (!Array.isArray(idsMateriales) || idsMateriales.length === 0) {
            return [];
        }

        const [rows] = await mysqlPool.query(`
            SELECT
                ms.IdMaterial_S,
                ms.Nombre_M,
                ms.PrecioBase,
                ms.Cantidad AS CantidadDisponible,
                ms.IdSucursal_FK,
                m.IdMaterial,
                m.NombreMaterial AS nombreMaterial,
                m.unidadBase
            FROM Material_Sucursal ms
            INNER JOIN Material m
                ON LOWER(TRIM(ms.Nombre_M)) = LOWER(TRIM(m.NombreMaterial))
            WHERE ms.IdSucursal_FK = ?
                AND m.IdMaterial IN (?)
        `, [idSucursal, idsMateriales]);

        return rows;
    }

    // Eliminar un registro por su ID
    static async eliminarMaterialSucursal(id) {
    const [result] = await mysqlPool.query('DELETE FROM Material_Sucursal WHERE IdMaterial_S = ?', [id]);
    return result.affectedRows > 0;
    }
}

module.exports = MaterialSucursal;



