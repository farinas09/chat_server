const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        useCreateIndex: true});

        console.log('db connected')
    } catch (error) {
        console.log(err);
        throw new Error('Error en la db');
    }
}

module.exports = {
    dbConnection
}