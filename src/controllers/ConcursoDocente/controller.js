const express = require('express');
const router = express();
const pool = require('../../database');
const concursoDocente = {};

concursoDocente.getConcursos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const concursos = await pool.query(`select id,  n.idconcurso ,fecha_ini, fecha_fin, modalidad, participacion, doc_req,doc_bases,doc_guia,d.iddocente iddocente from nominas_docentes n join concurso c on n.idconcurso = c.idconcurso
        join docentes d on n.iddocente = d.iddocente where d.iddocente = $1`, [id])
        res.status(200).json({
            concursos: concursos.rows
        })
    } catch (error) {
        console.log(error)
    }

}
concursoDocente.addLegajos = async (req, res, next) => {
    try {
        const { idnomina } = req.body;
        let same = await pool.query(`select * from legajos where idnomina = $1`, [idnomina])
        
        if (same.rows.length === 0) {
           
            await pool.query(`
            insert into legajos(puntaje_total, idnomina)values(null,$1)
            `, [idnomina])
            const idlegajos = await pool.query(`SELECT MAX(idlegajos) AS idlegajos FROM legajos`)
            res.status(200).json({
                message: 'creado correctamente',
                "idlegajos": idlegajos.rows[0].idlegajos
            })
           
        } else {
            const idlegajos = await pool.query(`SELECT MAX(idlegajos) AS idlegajos FROM legajos`)
            res.status(200).json({

                message: 'Ya existe un id creado, puede continuar',
                "idlegajos": idlegajos.rows[0].idlegajos
               
            })

        }





    } catch (error) {
        console.log(error)
    }



}





module.exports = concursoDocente;
