const { mysqlPool } = require('../config/mysql');

class Material {
    static async obtenerTodos() {
        const [rows] = await mysqlPool.query(`
            SELECT
                IdMaterial,
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            FROM Material
            ORDER BY IdMaterial ASC
        `);

        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await mysqlPool.query(`
            SELECT
                IdMaterial,
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            FROM Material
            WHERE IdMaterial = ?
        `, [id]);

        return rows[0];
    }

    static async crear(data) {
        const {
            nombreMaterial,
            descripcion,
            unidadBase,
            categoria
        } = data;

        const [result] = await mysqlPool.query(`
            INSERT INTO Material (
                nombreMaterial,
                descripcion,
                unidadBase,
                categoria
            )
            VALUES (?, ?, ?, ?)
        `, [nombreMaterial, descripcion, unidadBase, categoria]);

        return {
            IdMaterial: result.insertId,
            nombreMaterial,
            descripcion,
            unidadBase,
            categoria
        };
    }

    static async actualizar(id, data) {
        const {
            nombreMaterial,
            descripcion,
            unidadBase,
            categoria
        } = data;

        const [result] = await mysqlPool.query(`
            UPDATE Material
            SET
                nombreMaterial = ?,
                descripcion = ?,
                unidadBase = ?,
                categoria = ?
            WHERE IdMaterial = ?
        `, [nombreMaterial, descripcion, unidadBase, categoria, id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.obtenerPorId(id);
    }
}

module.exports = Material;