var express = require('express');
var bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const http = require ('http');
const moment = require('moment');

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to temperature capture!');
});
app.post('/temps', async function (req, res) {
    try{
        const {body} = req;
        console.log(body)
        var result = await temps.create({
            sn:body.sn,
            temp_value:body.temp_value,
            temp_datetime:moment()
        })
        res.status(200).json({status:'success',message:'Data saved.', data:result})
    }catch(error){
        console.error(error);
        res.status(500).json({status:'error',message:'Data save faild.', data:error})
    }
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//password vpanel = fFFblLbMZq
// A30xd0slfksdwl!
//Website for dui.000.pe
//fFFblLbMZq
const sequelize = new Sequelize('sql6686462', 'sql6686462', 'H2B1TziwTD', {
    host: 'sql6.freesqldatabase.com',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});



try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const temps = sequelize.define("temps", {
    row: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    temp_value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sn:{
        type:DataTypes.STRING,
        allowNull:true
    },
    temp_datetime: {
      type: DataTypes.DATEONLY,
    }
 });

 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 