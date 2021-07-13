const pool = require('../../database');
class Legajos {
    getModulos() {
        try {
            return pool.query(`
            select * from modulos
            `)
        } catch (error) {
            console.log(error);
        }
    }
    getSubModulos(id) {
        try {
            return pool.query(`
            select * from submodulos where idmodulos = $1
            `, [id])
        } catch (error) {
            console.log(error)
        }
    }
    getFormulario(name) {
        try {

            const SELECT = {
                'GRADOS': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems BETWEEN 1 AND 4`)
                },
                'TITULOS': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems = 15`)
                },
                'ESPECIALIZACION-DIPLOMATURAS': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems BETWEEN 5 AND 8`)
                },
                'ESTUDIOS': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems BETWEEN 9  AND 14 `)
                },
                'IDIOMAS-EXTRANJEROS-Y-O-NATIVOS': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems BETWEEN 16 AND  19`)
                },
                'EXPERIENCIA-PREDOCENTE': () => {
                    return pool.query(`SELECT *  FROM items WHERE iditems BETWEEN 16 AND  19`)

                }

            }
            const alternative = 'No se ha encontrado';
            const result = SELECT[name] ? SELECT[name]() : alternative;
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getInfoFormulario(name) {
        try {

            const INFO = {
                'GRADOS': () => {
                    return pool.query(`select nombre_grado nombre, centro_estudios, puntaje, it.nombre grado , abreviatura, url_archivo from formulario_puntaje f 
                   inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                   inner join formulario form on form.idformulario = f.idformulario
                   inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                   inner join items it on it.iditems = form.iditems
                   where f.idsubmodulos = 1 and nombre_grado is not null`)

                },
                'TITULOS': () => {
                    return pool.query(`select  tipo_titulo, mencion_titulo, centro_estudios, puntaje, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 2 and tipo_titulo is not null;`)
                },
                'ESPECIALIZACION-DIPLOMATURAS': () => {
                    return pool.query(`	 select  especialidad , centro_estudios, puntaje, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 3 and especialidad is not null;`)
                },
                'ESTUDIOS': () => {
                    return pool.query(`select   centro_estudios, puntaje, pais, nombre_estudios, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 4 and nombre_estudios is not null;`)
                },
                'IDIOMAS-EXTRANJEROS-Y-O-NATIVOS': () => {
                    return pool.query(`select    centro_estudios, idioma , it.nombre nivel,puntaje, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 5 and idioma is not null;`)
                },
                'EXPERIENCIA-PREDOCENTE': () => {
                    return pool.query(`select    centro_estudios, idioma , it.nombre nivel,puntaje, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 1 and idioma is not null;`)
                }

            }
            const alternative = 'No se ha encontrado';
            const result = INFO[name] ? INFO[name]() : alternative;
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    addFormulario(name, form) {
        try {
            //First Post
            const FORM = {
                'GRADOS': () => {
                    return pool.query(`
                       insert into formulario(iditems, nombre_grado,centro_estudios, años, url_archivo) values($1, $2, $3, $4, $5)
                       `, [form.iditems, form.nombre_grado, form.centro_estudios, form.años, form.url_archivo])

                },
                'TITULOS': () => {
                    return pool.query(`
                       insert into formulario(iditems, tipo_titulo,mencion_titulo, centro_estudios,años,  url_archivo) values($1, $2, $3, $4, $5, $6)
                       `, [form.iditems, form.tipo_titulo, form.mencion_titulo, form.centro_estudios, form.años, form.url_archivo])
                },
                'ESPECIALIZACION-DIPLOMATURAS': () => {
                    return pool.query(`
                       insert into formulario(iditems, especialidad, centro_estudios,años, creditos , url_archivo) values($1, $2, $3, $4, $5, $6)
                       `, [form.iditems, form.especialidad, form.centro_estudios, form.años, form.creditos, form.url_archivo])

                },
                'ESTUDIOS': () => {
                    return pool.query(`
                     insert into formulario(iditems, pais,años,nombre_estudios, centro_estudios, creditos , url_archivo) values($1, $2, $3, $4, $5, $6, $7)
                     `, [form.iditems, form.pais, form.años, form.nombre_estudios, form.centro_estudios, form.creditos, form.url_archivo])
                },
                'IDIOMAS-EXTRANJEROS-Y-O-NATIVOS': () => {
                    return pool.query(`
                     insert into formulario(iditems, centro_estudios,lengua_materna, idioma, unidad , url_archivo) values($1, $2, $3, $4, $5, $6)
                     `, [form.iditems, form.centro_estudios, form.lengua_materna, form.idioma, form.unidad, form.url_archivo])
                },
                'EXPERIENCIA-PREDOCENTE': () => {

                }


            }
            const alternative = 'No se ha encontrado';
            const result = FORM[name] ? FORM[name]() : alternative;
            return result;



            // Calculating
        } catch (error) {
            console.log(error)
        }
    }
    async getPuntaje(form, name) {
        switch (name) {
            case "GRADOS":

                console.log("ESTO ES GRADOSS :D")

                const verified = await pool.query(`select nombre_grado nombre, centro_estudios, puntaje, it.nombre grado , abreviatura, url_archivo from formulario_puntaje f 
                inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                inner join formulario form on form.idformulario = f.idformulario
                inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                inner join items it on it.iditems = form.iditems
                where f.idsubmodulos = 1 and nombre_grado is not null`)
                if (verified.rows.length === 0) {
                    console.log("ta vacio")
                    let puntaje = await pool.query(`
                    select puntos from items where iditems= $1;
                    `, [form.iditems])
                    let años = form.años;
                    let result = puntaje.rows[0].puntos * años;
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                    let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                    let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)


                    for (let index = 0; index < tranformacion.length; index++) {
                        const element = tranformacion[index].idtipopuntaje;
                        console.log(list.rows[index])
                        if (element === 1) {
                            console.log("entrando a la 1")
                            let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                            const idvalor = 1;
                            const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                            await pool.query(`
                           insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                           values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                        } else if (element == 2) {
                            let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                            console.log("id2 : ")
                            console.log(id2.rows)
                            await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                        } else if (element == 3) {
                            let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                            await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])


                        }


                        console.log(element)

                    }


                } else {
                    let puntaje = await pool.query(`
                    select puntos from items where iditems= $1;
                    `, [form.iditems])
                    let años = form.años;
                    let result = puntaje.rows[0].puntos * años;
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                    const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                    const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                    let idsubmodulo = form.idsubmodulo;
                    const idvalor = 1;
                    await pool.query(`
                          insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                          values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])
                }


                break;

            case "TITULOS":
                const verified2 = await pool.query(`
                select  tipo_titulo, mencion_titulo, centro_estudios, puntaje, url_archivo from formulario_puntaje f 
                inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                inner join formulario form on form.idformulario = f.idformulario
                inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                inner join items it on it.iditems = form.iditems
                where f.idsubmodulos = 2 and tipo_titulo is not null;
                `)
                if (verified2.rows.length === 0) {
                    console.log("ta vacio")
                    let puntaje = await pool.query(`
                    select puntos from items where iditems= $1;
                    `, [form.iditems])
                    let años = form.años;
                    let result = puntaje.rows[0].puntos * años;
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                    let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                    let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                    console.log(tranformacion);
                    for (let index = 0; index < tranformacion.length; index++) {

                        const element = tranformacion[index].idtipopuntaje

                        if (element === 1) {
                            console.log("entrando a la 1")
                            let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                            const idvalor = 1;
                            const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                            console.log(id1.rows)
                            await pool.query(`
                            insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                            values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])
                            console.log(element)
                        } else if (element == 2) {
                            let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');

                            await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                        } else if (element == 3) {
                            console.log("entrando al 3")
                            let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                            await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])

                        }
                        console.log(element)

                    }

                } else {
                    let puntaje = await pool.query(`
                    select puntos from items where iditems= $1;
                    `, [form.iditems])
                    let años = form.años;
                    let result = puntaje.rows[0].puntos * años;
                    await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                    const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                    const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                    let idsubmodulo = form.idsubmodulo;
                    const idvalor = 1;
                    await pool.query(`
                          insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                          values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])
                }




                break;



            case "ESPECIALIZACION-DIPLOMATURAS":
                console.log("entrando a espeicaliazcion");
                const verified3 = await pool.query(`select  especialidad , centro_estudios, puntaje, url_archivo from formulario_puntaje f 
                inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                inner join formulario form on form.idformulario = f.idformulario
                inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                inner join items it on it.iditems = form.iditems
                where f.idsubmodulos = 3 and especialidad is not null;`);
                if (verified3.rows.length === 0) {
                    console.log("vacío ")
                    if (form.iditems == 6 || form.iditems == 7 || form.iditems == 8) {
                        console.log("Creditos detectados")
                        let puntaje = await pool.query(`
                               select puntos from items where iditems= $1;
                               `, [form.iditems])
                        let creditos = form.creditos;
                        if (creditos <= 23) {
                            console.log("menos de 24 creditos")
                            let result = 0;
                            console.log("puntaje + " + result)
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                            let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                            let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                            console.log(tranformacion);
                            //AQUÍ
                            for (let index = 0; index < tranformacion.length; index++) {
                                const element = tranformacion[index].idtipopuntaje
                                if (element === 1) {
                                    console.log("entrando a la 1")
                                    let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                    const idvalor = 1;
                                    const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                    await pool.query(`
                                insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                                values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                                } else if (element == 2) {
                                    let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                    console.log("id2 : ")
                                    console.log(id2.rows)
                                    await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                                } else if (element == 3) {
                                    let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                    await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])
                                }
                            }






                        } else {
                            let result = puntaje.rows[0].puntos * 1;
                            console.log("puntaje + " + result)
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                            let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                            let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                            console.log(tranformacion);
                            //AQUÍ
                            for (let index = 0; index < tranformacion.length; index++) {
                                const element = tranformacion[index].idtipopuntaje
                                if (element === 1) {
                                    console.log("entrando a la 1")
                                    let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                    const idvalor = 1;
                                    const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                    await pool.query(`
                                insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                                values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                                } else if (element == 2) {
                                    let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                    console.log("id2 : ")
                                    console.log(id2.rows)
                                    await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                                } else if (element == 3) {
                                    let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                    await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])



                                }
                            }
                        }
                    } else {

                        console.log("Años detectados")
                        let puntaje = await pool.query(`
                         select puntos from items where iditems= $1;
                         `, [form.iditems])
                        let años = form.años;
                        let result = puntaje.rows[0].puntos * años;
                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                        let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                        let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)

                        for (let index = 0; index < tranformacion.length; index++) {
                            const element = tranformacion[index].idtipopuntaje

                            if (element === 1) {
                                console.log("entrando a la 1")
                                let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                const idvalor = 1;
                                const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                await pool.query(`
                            insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                            values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                            } else if (element == 2) {
                                let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                console.log("id2 : ")
                                console.log(id2.rows)
                                await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                            } else if (element == 3) {
                                let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])



                            }
                        }

                    }

                } else {
                    if (form.iditems == 6 || form.iditems == 7 || form.iditems == 8) {
                        console.log("Creditos detectados")
                        let puntaje = await pool.query(`
                               select puntos from items where iditems= $1;
                               `, [form.iditems])
                        let creditos = form.creditos;
                        if (creditos <= 23) {
                            console.log("menos de 24 creditos")
                            let result = 0;
                            console.log("puntaje + " + result)
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])


                        } else {
                            let result = puntaje.rows[0].puntos * 1;
                            console.log("puntaje + " + result)
                            await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        }

                        const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                        const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                        let idsubmodulo = form.idsubmodulo;
                        const idvalor = 1;
                        await pool.query(`
                              insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                              values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])

                    } else {
                        console.log("Años detectados")
                        let puntaje = await pool.query(`
                         select puntos from items where iditems= $1;
                         `, [form.iditems])
                        let años = form.años;
                        let result = puntaje.rows[0].puntos * años;
                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                        const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                        let idsubmodulo = form.idsubmodulo;
                        const idvalor = 1;
                        await pool.query(`
                              insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                              values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])

                    }




                }




                break;

            case "ESTUDIOS":
                const verified4 = await pool.query(`
                    select   centro_estudios, puntaje, pais, nombre_estudios, url_archivo from formulario_puntaje f 
                    inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                    inner join formulario form on form.idformulario = f.idformulario
                    inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                    inner join items it on it.iditems = form.iditems
                    where f.idsubmodulos = 4 and nombre_estudios is not null;
                `)
                if (verified4.rows.length === 0) {
                    console.log("Estudios detectados y vacío")
                    if (form.iditems == 14) {
                        let result = 0;
                        console.log("id 14 detectado")
                        let creditos = form.creditos;
                        if (creditos >= 15 && creditos <= 20) {
                            result = 0.5
                        } else if (creditos >= 21 && creditos <= 23) {
                            result = 0.75
                        } else if (creditos >= 24) {
                            result = 1
                        } else {
                            result = 0;
                        }

                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                        let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                        let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                        for (let index = 0; index < tranformacion.length; index++) {
                            const element = tranformacion[index].idtipopuntaje

                            if (element === 1) {
                                console.log("entrando a la 1")
                                let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                const idvalor = 1;
                                const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                await pool.query(`
                            insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                            values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                            } else if (element == 2) {
                                let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                console.log("id2 : ")
                                console.log(id2.rows)
                                await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                            } else if (element == 3) {
                                let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])



                            }
                        }



                    } else {
                        console.log("Años detectados")
                        let puntaje = await pool.query(`
                         select puntos from items where iditems= $1;
                         `, [form.iditems])
                        let años = form.años;
                        let result = puntaje.rows[0].puntos * años;
                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                        let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                        let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                        for (let index = 0; index < tranformacion.length; index++) {
                            const element = tranformacion[index].idtipopuntaje

                            if (element === 1) {
                                console.log("entrando a la 1")
                                let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                const idvalor = 1;
                                const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                await pool.query(`
                            insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                            values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                            } else if (element == 2) {
                                let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                console.log("id2 : ")
                                console.log(id2.rows)
                                await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                            } else if (element == 3) {
                                let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])



                            }
                        }


                    }


                } else {
                    console.log("Estudios detectados")
                    if (form.iditems == 14) {
                        let result = 0;
                        console.log("id 14 detectado")
                        let creditos = form.creditos;
                        if (creditos >= 15 && creditos <= 20) {
                            result = 0.5
                        } else if (creditos >= 21 && creditos <= 23) {
                            result = 0.75
                        } else if (creditos >= 24) {
                            result = 1
                        } else {
                            result = 0;
                        }
                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                        const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                        let idsubmodulo = form.idsubmodulo;
                        const idvalor = 1;
                        await pool.query(`
                          insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                          values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])


                    } else {
                        console.log("Años detectados")
                        let puntaje = await pool.query(`
                     select puntos from items where iditems= $1;
                     `, [form.iditems])
                        let años = form.años;
                        let result = puntaje.rows[0].puntos * años;
                        console.log("puntaje " + result)
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                        const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                        let idsubmodulo = form.idsubmodulo;
                        const idvalor = 1;
                        await pool.query(`
                          insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                          values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])



                    }
                }

                break;
            case "IDIOMAS-EXTRANJEROS-Y-O-NATIVOS":
                const verified5 = await pool.query(`select    centro_estudios, idioma , it.nombre nivel,puntaje, url_archivo from formulario_puntaje f 
                inner join submodulos sub on f.idsubmodulos = sub.idsubmodulos 
                inner join formulario form on form.idformulario = f.idformulario
                inner join puntaje pun on pun.idpuntaje = f.idpuntaje
                inner join items it on it.iditems = form.iditems
                where f.idsubmodulos = 5 and idioma is not null;`)
                if (verified5.rows.length === 0) {
                    if (form.iditems == 16 || form.iditems == 17 || form.iditems == 18 || form.iditems == 19) {
                        console.log("hola C:")
                        let unidad = form.unidad;
                        console.log(unidad)
                        let puntaje = await pool.query(`
                            select puntos from items where iditems= $1;
                            `, [form.iditems])
                        let result = unidad * puntaje.rows[0].puntos;
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(2, $1)', [result])
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(3, $1)', [result])
                        let list = await pool.query(`select * from puntaje  where puntaje = $1 ORDER BY idpuntaje DESC LIMIT 3`, [result])
                        let tranformacion = list.rows.sort((a, b) => a.idtipopuntaje - b.idtipopuntaje)
                        for (let index = 0; index < tranformacion.length; index++) {
                            const element = tranformacion[index].idtipopuntaje

                            if (element === 1) {
                                console.log("entrando a la 1")
                                let id1 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 1')
                                const idvalor = 1;
                                const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                                await pool.query(`
                            insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                            values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, id1.rows[0].idpuntaje, form.idsubmodulo])

                            } else if (element == 2) {
                                let id2 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 2');
                                console.log("id2 : ")
                                console.log(id2.rows)
                                await pool.query('insert into submodulos_puntaje(idsubmodulos, idvalor, idpuntaje) values($1, $2, $3)', [form.idsubmodulo, 1, id2.rows[0].idpuntaje])
                            } else if (element == 3) {
                                let id3 = await pool.query('SELECT MAX(idpuntaje) AS idpuntaje FROM puntaje where idtipopuntaje = 3');
                                await pool.query(`insert into modulos_puntaje(idmodulos, idlegajos, idpuntaje) values($1,$2,$3) `, [1, null, id3.rows[0].idpuntaje])



                            }
                        }






                    }

                } else {
                    if (form.iditems == 16 || form.iditems == 17 || form.iditems == 18 || form.iditems == 19) {
                        console.log("hola C:")
                        let unidad = form.unidad;
                        console.log(unidad)
                        let puntaje = await pool.query(`
                        select puntos from items where iditems= $1;
                        `, [form.iditems])
                        let result = unidad * puntaje.rows[0].puntos;
                        await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                        console.log("puntaje " + result)
                        const idformulario = await pool.query('SELECT MAX(idformulario) AS id FROM formulario');
                        const idpuntaje = await pool.query('SELECT MAX(idpuntaje) AS id FROM puntaje')
                        let idsubmodulo = form.idsubmodulo;
                        const idvalor = 1;
                        await pool.query(`
                      insert into formulario_puntaje(idformulario, idvalor, idpuntaje, idsubmodulos ) 
                      values($1,$2,$3, $4)`, [idformulario.rows[0].id, idvalor, idpuntaje.rows[0].id, idsubmodulo])
                    }
                }
                break;

            default:
                //  console.log("ESTO ES DEFAULT :D")
                //  console.log("CUANDO NO ES ESPECIALIZACIÓN NI ESTUDIOS")
                //  let puntaje = await pool.query(`
                //  select puntos from items where iditems= $1;
                //  `, [form.iditems])
                //  console.log(puntaje.rows)
                //  let años = form.años;
                //  let result = puntaje.rows[0].puntos * años;
                //  console.log(result)
                //  await pool.query('insert into puntaje(idtipopuntaje, puntaje) values(1, $1)', [result])
                break;
        }
    }
    async updatePuntj(idsubmodulo, form) {
        const res = await pool.query(` select * from submodulos_puntaje where idsubmodulos = $1`, [idsubmodulo])
        if (res.rows.length === 0) {
            return "no hay datos";
        } else {


            console.log(res.rows[0].idpuntaje)
            await pool.query(`update puntaje set puntaje = $1 where idpuntaje = $2`, [form.puntaje, res.rows[0].idpuntaje])
            const pun = await pool.query(` select * from puntaje where idpuntaje = $1`, [res.rows[0].idpuntaje])
            return pun.rows[0].puntaje
        }


    }
    async updatePuntjModulo(idmodulo, form) {
        const res = await pool.query(`SELECT MIN(idpuntaje) AS idpuntaje FROM modulos_puntaje where idmodulos = $1 LIMIT 1 ;`, [idmodulo])
        if (res.rows.length === 0) {
            return "no hay datos"

        } else {
            await pool.query(`update puntaje set puntaje = $1 where idpuntaje = $2`, [form.puntaje, res.rows[0].idpuntaje])
            const pun = await pool.query(` select * from puntaje where idpuntaje = $1`, [res.rows[0].idpuntaje])
            return pun.rows[0].puntaje
        }
    }

    async updateModulosPuntaje(form) {
        const res = await pool.query(`SELECT MIN(idpuntaje) AS idpuntaje FROM modulos_puntaje`)
        console.log(res.rows[0].idpuntaje)
        await pool.query(`update modulos_puntaje set idlegajos = $1 where idpuntaje = $2`, [form.idlegajos, res.rows[0].idpuntaje])
        const puntaje = await pool.query(`select puntaje from puntaje where idpuntaje = $1`, [res.rows[0].idpuntaje])
        return puntaje.rows[0].puntaje



    }



}

module.exports = Legajos;