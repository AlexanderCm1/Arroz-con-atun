const pool = require('../../database');
class Concurso {
    constructor(idmodalidad, tipo_concurso, fecha_ini, fecha_fin, doc_req, doc_bases, doc_guia, iddocente) {
        idmodalidad = idmodalidad
        tipo_concurso = tipo_concurso
        fecha_ini = fecha_ini
        fecha_fin = fecha_fin
        doc_req = doc_req
        doc_bases = doc_bases
        doc_guia = doc_guia
        iddocente = iddocente





    }
    //ALL GETTTERS
    getAllConcursos() {
        try {
            return pool.query('select * from concurso where iddocente is not null')

        } catch (error) {
            console.log(error)
        }

    }
    getAllAuxiliar() {
        try {
            return pool.query(`
            select cat.iddocente, p.nombre nombre, p.dni dni, p.correo, c.nombre categoria, cat.ano_categoria año_categoria, cat.prox_categoria prox_categoria  from categoria_docente cat inner join docentes d on d.iddocente = cat.iddocente
            inner join categorias c on c.idcategorias = cat.idcategoria inner join persona p on p.idpersona = d.iddocente where disponible = '1' and  c.nombre = 'Auxiliar';`)
        } catch (error) {
            console.log(error)
        }
      
    }

    getAllAsociado() {
        try {
            return pool.query(`
            select cat.iddocente, p.nombre nombre, p.dni dni, p.correo, c.nombre categoria, cat.ano_categoria año_categoria, cat.prox_categoria prox_categoria  from categoria_docente cat inner join docentes d on d.iddocente = cat.iddocente
            inner join categorias c on c.idcategorias = cat.idcategoria inner join persona p on p.idpersona = d.iddocente where disponible = '1' and  c.nombre = 'Asociado';`)  
        } catch (error) {
            console.log(error)
        }
        
    }


    getAllPrincipal() {
        try {
            return pool.query(`
            select cat.iddocente, p.nombre nombre, p.dni dni, p.correo, c.nombre categoria, cat.ano_categoria año_categoria, cat.prox_categoria prox_categoria  from categoria_docente cat inner join docentes d on d.iddocente = cat.iddocente
            inner join categorias c on c.idcategorias = cat.idcategoria inner join persona p on p.idpersona = d.iddocente where disponible = '1' and  c.nombre = 'Principal';`)
        } catch (error) {
            console.log(error)
        }
       
    }
    getLastId(){
        try {
            return  pool.query(`SELECT *
            FROM concurso
            ORDER by idconcurso DESC
            LIMIT 1;`)   
        } catch (error) {
            console.log(error)
        }
        
    }
    //All post
    createConcurso() {
        try {
          return  pool.query(`insert into concurso (tipo_concurso, fecha_ini,
                fecha_fin, doc_req, doc_bases,doc_guia,
                iddocente, modalidad, participacion) values(null, null, null,  null, null, null, null,null, null)`)
        } catch (error) {
            console.log(error)
        }
    }
    addNomina() {

    }

    //ALL PUT
    createInfo(concurso, id) {
      return  pool.query(`Update concurso SET tipo_concurso = $1 , modalidad = $2 , participacion = $3 , DOC_REQ = $4 ,DOC_BASES = $5, DOC_GUIA = $6, fecha_ini = $7, fecha_fin =  $8 where idconcurso = $9`,
            [concurso.tipo_concurso, concurso.modalidad, concurso.participacion, concurso.doc_req, concurso.doc_bases, concurso.doc_guia, concurso.fecha_ini, concurso.fecha_fin, id])
    }
    concursoAdded(iddocente, id){
      try {
     return  pool.query(`
        update concurso set iddocente = $1 where idconcurso = $2 `, [iddocente, id])
      } catch (error) {
          
      }  
    }





}
module.exports = Concurso;