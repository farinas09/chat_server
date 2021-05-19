const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };
        jwt.sign( payload, process.env.JWT_SEED, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                reject('No se pudo generar el JWT');
            } else {
                // token created
                resolve( token );
            }
        })
    });
}

const verifyToken = ( token = '' ) => {

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SEED );
        return [ true, uid];

    } catch (error) {
        return [ false, null ];
    }

}

module.exports = {
    generateJWT
}