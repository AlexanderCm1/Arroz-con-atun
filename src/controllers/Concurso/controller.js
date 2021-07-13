const express = require('express');
const router = express();
const pool = require('../../database');
const jwtGenerator = require('../../utils/jwtGenerator');
const helper = require('../../lib/helpers')
const concursoController = {};
const Concurso = require('../Concurso/model');
const { query } = require('express');
let transporter = require('../../middleware/transporter');

concursoController.getAll = async (req, res, next) => {
    try {
        const concurso = await new Concurso().getAllConcursos();
        return res.status(200).json({
            concurso: concurso.rows
        })
    } catch (error) {
        console.log(error)
    }

}
concursoController.infoBasic = async (req, res, next) => {
    try {
        const concurso = req.body;
        const { id } = req.params;
        await new Concurso().createInfo(concurso, id)
        res.status(200).json({
            message: 'Información Básica creada'
        })

    } catch (error) {
        console.log(error)
    }

}




concursoController.create = async (req, res, next) => {
    try {

        await new Concurso().createConcurso();

        const id = await new Concurso().getLastId();


        res.status(200).json({
            message: 'Concurso Creado Correctamente',
            idconcurso: id.rows[0].idconcurso

        })

    } catch (error) {
        console.log(error)
    }

}


concursoController.getDocentesAuxiliar = async (req, res, next) => {
    try {
        const docentes = await new Concurso().getAllAuxiliar();
        res.status(200).json({
            docentes: docentes.rows
        })
    } catch (error) {
        console.log(error)
    }
}
concursoController.getDocentesAsociado = async (req, res, next) => {
    try {
        const docentes = await new Concurso().getAllAsociado();
        res.status(200).json({
            docentes: docentes.rows
        })
    } catch (error) {
        console.log(error)
    }
}

concursoController.getDocentesPrincipal = async (req, res, next) => {
    try {
        const docentes = await new Concurso().getAllPrincipal();
        res.status(200).json({
            docentes: docentes.rows
        })
    } catch (error) {
        console.log(error)
    }
}
concursoController.concursoAdded = async (req, res, next) => {
    try {
        const { iddocente } = req.body
        const { id } = req.params;
        await new Concurso().concursoAdded(iddocente, id);
        res.status(200).json({
            message: "docente added"
        })
    } catch (error) {
        console.log(error)
    }
}


concursoController.addNomina = async (req, res, next) => {
    try {
        const idconcurso = req.body.idconcurso;
        const iddocentes = req.body.iddocentes;
        for (let i = 0; i < iddocentes.length; i++) {

            const element = await iddocentes[i];
            console.log(element)
            await pool.query('insert into nominas_docentes(idconcurso, iddocente, fecha_creacion)values($1,$2,$3)', [idconcurso, element, new Date().toLocaleString()])
            const correos = await pool.query(`select p.correo from nominas_docentes n inner join persona p on p.idpersona = n.iddocente where n.iddocente = $1;`, [element])
            const nombre = await pool.query(`select p.nombre from nominas_docentes n inner join persona p on p.idpersona = n.iddocente where n.iddocente = $1;`, [element])
            const apellido = await pool.query(`select p.apellido from nominas_docentes n inner join persona p on p.idpersona = n.iddocente where n.iddocente = $1;`, [element])
            let mailOptions = {
                from: 'no-reply-upeulegajo@gmail.com',
                to: correos.rows[0].correo,
                subject: 'hola te has ganado una ',
                html: `
                <img src = "https://www.upeu.edu.pe/fia/wp-content/uploads/sites/2/2020/12/LOGO-UPeU-01.png"
                <br>
                <hr>
                <p>
                Hola querido docente ${apellido.rows[0].apellido} ${nombre.rows[0].nombre}, le invitamos cordialmente al concurso de la categorización docente Upeu ${new Date().getFullYear()} 
                puedes ingresar a subir tus legajos en el siguiente Link,cualquier duda o consulta llamar al +51 xxxx-xxxx-xxx
            
                </p>`

            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email Enviado :D!: ' + info.response);

                }
            });


        }

        res.status(200).json({
            message: "Succesfully"
        })


    } catch (error) {
        console.log(error)
    }
}

module.exports = concursoController;


