
const hasSomething = (string) => {
    if (string !== null && string !== undefined && string !== '') {
        return true;
    } else {
        return false;
    }
}

let db_host = '';
let db_database = '';
let db_username = '';
let db_password = '';

if (process.env.NODE_ENV == 'development') {
    db_host = process.env.DB_DEV_HOST;
    db_database = process.env.DB_DEV_DATABASE;
    db_username = process.env.DB_DEV_USERNAME;
    db_password = process.env.DB_DEV_PASSWORD;
} else if (process.env.NODE_ENV == 'production') {
    db_host = process.env.DB_PROD_HOST;
    db_database = process.env.DB_PROD_DATABASE;
    db_username = process.env.DB_PROD_USERNAME;
    db_password = process.env.DB_PROD_PASSWORD;
}

sequelize.sync()
    .then(() => {
        if (process.env.NODE_ENV == 'development') {
            console.log('Conexión exitosa con BD de desarrollo.');
        } else if (process.env.NODE_ENV == 'production') {
            console.log('Conexión exitosa con BD de producción.');
        }
    }).catch(err => {
        console.log('Error conectando a BD: ', err);
    });


if (!hasSomething(db_host) || !hasSomething(db_database) || !hasSomething(db_username) || !hasSomething(db_password)) {
    console.log('Hacen falta ciertos datos para realizar conexión a BD.');
}


const Sequelize = require('sequelize')

const sequelize = new Sequelize(db_database, db_username, db_password, {
    host: db_host,
    dialect: 'postgres',
    port: '5432',
    logging: false,
    timezone: 'utc'
});

