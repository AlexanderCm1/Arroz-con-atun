
const legajosController = {};
const pool = require('../../database');
const Legajos = require('../Legajos/model')


legajosController.getModulos = async (req, res, next) => {
    try {
        const modulos = await new Legajos().getModulos();
        res.status(200).json({
            modulos: modulos.rows
        })
    } catch (error) {
        console.log(error);
    }

}
legajosController.getNombre = async (req, res, next) => {
    try {
        const { id } = req.params
        const nombre = await pool.query(`select nombre from modulos where  idmodulos = $1`, [id])
        return res.status(200).json({
            nombre: (await nombre).rows
        })
    } catch (error) {

    }
}

legajosController.getSubModulos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subModulos = await new Legajos().getSubModulos(id);
        res.status(200).json({
            subModulos: subModulos.rows
        })
    } catch (error) {
        console.log(error);
    }
}
legajosController.getFormulario = async (req, res, next) => {
    try {
        const { name } = req.params
        const form = await new Legajos().getFormulario(name);
        const info = await new Legajos().getInfoFormulario(name);


        res.status(200).json({
            select: form.rows,
            info: info.rows
        })
    } catch (error) {
    }
}
legajosController.addFormulario = async (req, res, next) => {
    try {
        const { name } = req.params;
        const form = req.body
        await new Legajos().addFormulario(name, form)
        await new Legajos().getPuntaje(form, name)


        res.status(200).json({
            message: "Guardado Correctamente",
        })

    } catch (error) {
        console.log(error)
    }

}
legajosController.updatePuntaje = async (req, res, next) => {
    try {
        const { idsubmodulo } = req.params;
        const form = req.body
        const puntaje = await new Legajos().updatePuntj(idsubmodulo, form)
        res.status(200).json({
            "puntaje": puntaje
        })


    } catch (error) {
        console.log(error)
    }



}

legajosController.updatePuntajeModulos = async (req, res, next) => {
    try {
        const { idmodulo } = req.params;
        const form = req.body
        const puntaje = await new Legajos().updatePuntjModulo(idmodulo, form)
        res.status(200).json({
            "puntaje": puntaje
        })


    } catch (error) {
        console.log(error)
    }



}




legajosController.puntajeSubmodulos = async (req, res, next) => {
    try {
        const {id} = req.params;
        const form = req.body;
        const general = await pool.query(`select sub_p.idsubmodulos, sub.nombre nombre, puntaje from submodulos_puntaje sub_p inner join submodulos sub on sub.idsubmodulos = sub_p.idsubmodulos
        inner join puntaje pun on pun.idpuntaje = sub_p.idpuntaje 
        inner join modulos modu on modu.idmodulos = sub.idmodulos where modu.idmodulos = $1 ;`, [id])
        const puntaje = await new Legajos().updateModulosPuntaje(form)
        res.status(200).json({
            "vista": general.rows,
            "puntaje" : puntaje
        })


    } catch (error) {
        console.log(error)
    }
}
legajosController.getModuloSuma = async(req,res,next) =>{

     const {idlegajos} = req.params
    const moduloSuma = await pool.query(`
    select mp.idmodulopuntaje,mp.idmodulos,mp.idlegajos,p.puntaje from modulos_puntaje mp join puntaje p on mp.idpuntaje = p.idpuntaje 
     where mp.idlegajos = $1;
    `, [idlegajos])
    res.status(200).json({
        puntajemodulo : moduloSuma.rows

    })

    


}

legajosController.putLegajos = async(req,res,next) =>{
    try {
        const {idlegajos } = req.params;
        const {puntaje} = req.body;
        await pool.query(`
        update legajos set puntaje_total = $1 where idlegajos = $2
            `,[puntaje , idlegajos]) 
        res.status(200).json({

            "message" : "agregado correctamente"
        })

    } catch (error) {
        console.log(error)
    }







}















module.exports = legajosController;