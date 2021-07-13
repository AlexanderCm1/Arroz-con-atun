const jwt = require('jsonwebtoken');
require("dotenv").config();
const pool = require('../database');
 const verifyToken = async(req,res,next) =>{
    try {
        const bearerHeader = req.headers['authorization'];
        if(!typeof bearerHeader !== 'undefinied'){
            const bearer = bearerHeader.split(' ');
            const brearerToken = bearer[1];
            const jwtToken = brearerToken;
            const payload = jwt.verify(jwtToken,   `${process.env.JWT_KEY}`)
            req.user = payload.user;
            next();
        }
        if(!bearerHeader){
            return res.status(403).json("Verify token");
        }
    



    } catch (error) {
        console.log(error)
        return res.status(403).json({
            error : 'No estás autorizado'
        })
        
    }

}
const isComision = async( req,res, next) =>{
    console.log(req.user);
   const user = await pool.query('Select * from usuarios where iduser = $1' , [req.user]);
   const roles = await pool.query(`select  name from usuario_rol us join usuarios u 
   on u.iduser = us.iduser join roles r on r.idrol = us.idrol where username = $1` , [user.rows[0].username] )
   console.log(roles.rows[0].name)
  if(roles.rows[0].name === "Comision"){
      next()
      return;
  }
  
   return res.status(403).json({message : 'No tienes los permisos necesarios'});

  



};

const isProfessor = async( req,res, next) =>{
   console.log(req.user);
   const user = await pool.query('Select * from usuarios where iduser = $1' , [req.user]);
   const roles = await pool.query(`select  name from usuario_rol us join usuarios u 
   on u.iduser = us.iduser join roles r on r.idrol = us.idrol where username = $1` , [user.rows[0].username] )
   console.log(roles.rows[0].name)
  if(roles.rows[0].name === "Docente"){
      next()
      return;
  }
  
   return res.status(403).json({message : 'No tienes los permisos necesarios'});
};

module.exports = {
    verifyToken,
    isComision,
    isProfessor
}
