const express = require('express');
const router = express();
const pool = require('../../database');
const jwtGenerator = require('../../utils/jwtGenerator');
const helper = require('../../lib/helpers')
const userController = {};

const { verifyToken, isComision, isProfessor } = require('../../middleware/authorization');

//Register

userController.register = async (req, res, next) => {
    try {
        const { iduser, username, password } = req.body;

        const user = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (user.rows.length !== 0) {
            return res.status(401).json({ Error: 'Usuario existente' })
        }

        const passwordEncrypted = await helper.encryptPassword(password);

        const newUser = await pool.query('INSERT INTO usuarios( iduser, username, password) values($1,$2, $3) RETURNING *'
            , [iduser, username, passwordEncrypted]);



        //generating out jwt token
        const accessToken = jwtGenerator.AccesToken(newUser.rows[0].iduser);
        const RefreshToken = jwtGenerator.RefreshToken(newUser.rows[0].iduser);
        res.json({ accessToken: accessToken, refreshToken: RefreshToken });





    } catch (error) {
        console.log(error);

    }
}

//login route
userController.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query('Select * from usuarios where username = $1', [username]);
        if (user.rows.length === 0) {
            res.status(400).json({
                error: 'Password or Email is incorrect'
            })
        }
        const validPassword = await helper.matchPassword(password, user.rows[0].password);
        if (!validPassword) {
            res.status(400).json({
                error: 'Password or Email is incorrect'
            })
        }


        const role = await pool.query(`select  name from usuario_rol us join usuarios u 
        on u.iduser = us.iduser join roles r on r.idrol = us.idrol where username = $1` , [user.rows[0].username])
        const person = await pool.query(`
        select  p.nombre nombre, p.apellido apellidos, p.correo correo, p.foto , cate.nombre categoria, ua.nombre escuela, ua2.nombre facultad , ua3.nombre sede
        from persona p inner join usuarios u 
        on u.iduser = p.idpersona inner join 
        categoria_docente cat on cat.iddocente = p.idpersona
        inner join categorias cate on cate.idcategorias = cat.idcategoria
        inner join docentes d on p.idpersona = d.iddocente
        inner join unidad_academica ua on d.idunidad = ua.idunidad
        FULL OUTER join  unidad_academica ua2 on  ua.idpadre = ua2.idunidad 
        join unidad_academica ua3 on ua2.idpadre = ua3.idunidad 
        where u.username = $1`, [user.rows[0].username])
        const id = await pool.query(`select p.idpersona from persona p inner join usuarios u on u.iduser = p.idpersona where u.username = $1`, [user.rows[0].username])

        const token = jwtGenerator.AccesToken(user.rows[0].iduser);
        const refreshToken = jwtGenerator.RefreshToken(user.rows[0].iduser);


        res.status(200).json({
            user: [
                {
                    id: id.rows[0].idpersona,
                    username: user.rows[0].username,
                    nombre: person.rows[0].nombre,
                    apellido: person.rows[0].apellidos,
                    foto: person.rows[0].foto,
                    correo: person.rows[0].correo,
                    rol: role.rows[0].name,
                    categoria : person.rows[0].categoria,
                    escuela : person.rows[0].escuela,
                    facultad : person.rows[0].facultad,
                    sede : person.rows[0].sede
                }
            ]
            ,
            accessToken: token,
            refreshToken: refreshToken
        });





    } catch (error) {
        console.log(error);
    }
}

userController.verify = async (req, res, next) => {
    try {
        res.json(true);
    } catch (error) {
        res.json(false)
    }
}


router.get('/admin', verifyToken, isComision, async (req, res, next) => {
    try {
        res.json({ Bienvenida: 'Bienvenida comisión' });
    } catch (error) {

    }
})











module.exports =
    userController
    ;