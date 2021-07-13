const express = require('express');
const router = express();
const pool = require('../../database');
const revisionController = {};
revisionController.getLegajo = async(req,res,next) =>{
    const legajos = await pool.query(`
    select idlegajos,revisado,  per.nombre nombre, per.apellido apellido, catego.nombre categoria, puntaje_total   from legajos leg inner join nominas_docentes nomi on nomi.id = leg.idnomina 
    inner join docentes doc on doc.iddocente = nomi.iddocente 
    inner join persona per on per.idpersona = doc.iddocente
    inner join categoria_docente cate on cate.iddocente = doc.iddocente
    inner join categorias catego on cate.idcategoria = catego.idcategorias
    `)
    res.status(200).json({
        legajos : legajos.rows


    })
}



module.exports = revisionController





