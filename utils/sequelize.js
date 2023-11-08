// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: process.env.DB_HOSTNAME,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });
// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to DB');
//         return;
//     }
//     console.log('Connected!');
// });

// module.exports = db;

///////////////////////////////////////////////////////////////////////////////////////////////

const {Sequelize, DataTypes} = require("sequelize");

const config = require(`${__dirname}/../config/sequelize.js`);
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const files = sequelize.define("Files", {
   id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },
   owner: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   pin: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   link: {
     type: DataTypes.STRING,
     allowNull: false
   }
});

const permissions = sequelize.define("Permissions", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 });

sequelize.sync().then(() => {
   console.log('Tables created successfully!');
}).catch((error) => {
   console.error('Unable to create table: ', error);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
    db,
    files,
    permissions
};
