import { Request, Response } from 'express';
import pool from '../database';
class ApiController {


    public async getEditoriales(req: Request, res: Response) {
        let sql = "SELECT idEditorial, nombre, imagen FROM Editorial";
        const result = await pool.query(sql);
        res.json(result);
    }

    public async getComics(req: Request, res: Response) {
        let sql = "SELECT c.idComic, c.nombre, c.year_impresion, c.sinopsis, e.nombre as Editorial, e.imagen as imagen, u.nickname as Usuario, u.idUsuario as idUsuario "
            + " FROM Comic c, Editorial e, Usuario u"
            + " WHERE c.Editorial_idEditorial = e.idEditorial"
            + " AND c.Usuario_idUsuario =  u.idUsuario";
        const result = await pool.query(sql);
        res.json(result);
    }

    public async loginUser(req: Request, res: Response) {
        const { user, pass } = req.body;
        let sql = "SELECT idUsuario, nickname, nombre FROM Usuario"
            + " WHERE nickname = ?"
            + " AND pass = ?";
        try {
            const result = await pool.query(sql, [user, pass]);
            res.json(result);
        } catch (err) {
            res.json("Error - Consulta incorrecta");
            console.log("ERROR: " + err);
        }
    }


    public async deleteComic(req: Request, res: Response) {
        const { idComic } = req.params;
        console.log("idComic: "+idComic);
        let sql = "DELETE FROM Comic WHERE idComic = ?"

        try {
            const result = await pool.query(sql, [idComic]);
            if (result.affectedRows > 0) {
                let resultado = {
                    deleted: "true"
                }
                res.json(resultado);
            } else {
                let resultado = {
                    deleted: "false"
                }
                res.json(resultado);

            }
        } catch (err) {
            res.json("Error - Consulta incorrecta");
            console.log("ERROR: " + err);
        }
    }

    public async updateComic(req: Request, res: Response) {
        const { nombre, year, sinopsis, idEditorial, idComic } = req.body;
        let sql = "UPDATE Comic"
            + " SET nombre = ?, year_impresion = ?, sinopsis = ?,  Editorial_idEditorial = ?"
            + " WHERE idComic = ?";
        try {
            const result = await pool.query(sql, [nombre, year, sinopsis, idEditorial, idComic]);
            if (result.affectedRows > 0) {
                let resultado = {
                    actualizado: "true"
                }
                res.json(resultado);
            } else {
                let resultado = {
                    actualizado: "false"
                }
                res.json(resultado);
            }

        } catch (err) {
            res.json("Error - Consulta incorrecta");
            console.log("ERROR: " + err);
        }
    }


    public async postComic(req: Request, res: Response) {
        const { nombre, year, sinopsis, idEditorial, idUser } = req.body;
        let sql = "INSERT INTO Comic(nombre, year_impresion, sinopsis, Editorial_idEditorial, Usuario_idUsuario)"
            + " VALUES (?, ?, ?, ?, ?)";
        try {
            const result = await pool.query(sql, [nombre, year, sinopsis, idEditorial, idUser]);
            let resultado: any = {
                post: "true"
            }
            res.json(resultado);
        } catch (err) {
            res.json("Error - Consulta incorrecta");
            console.log("ERROR: " + err);
        }
    }

    public async postUser(req: Request, res: Response) {
        const {nombre, nickname, pass, fecha, sexo} = req.body;
        let sql = "INSERT INTO Usuario(nombre, nickname, pass, fecha_nacimiento, sexo)"
            + " VALUES (?, ?, ?, ?, ?)";
        try {
            const result = await pool.query(sql, [nombre, nickname, pass, fecha, sexo]);
            let resultado: any = {
                post: "true"
            }
            res.json(resultado);
        } catch (err) {
            res.json("Error - Consulta incorrecta");
            console.log("ERROR: " + err);
        }
    }
}

export const apiController = new ApiController();
