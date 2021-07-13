const jwt = require('jsonwebtoken');

require('dotenv').config();

const AccesToken = (iduser) =>{
    const payload = {
        user : iduser
    }
    const accesToken = jwt.sign(payload, `${process.env.JWT_KEY}`, {expiresIn : 60 * 60});
    return accesToken;
  
}

const RefreshToken = (iduser) =>{
    const payload = {
        user : iduser
    }
    const refreshToken = jwt.sign(payload, `${process.env.JWT_KEY_REFRESH}`, {expiresIn : 60 * 60});
    return refreshToken;
  
}



module.exports = {
    AccesToken,
    RefreshToken
};