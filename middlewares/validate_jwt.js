  
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {
    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is required'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SEED );
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }




}


module.exports = {
    validateJWT
}