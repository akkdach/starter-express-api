var express = require('express');
var cors = require('cors')

var bodyParser = require('body-parser');
const { Sequelize,Op, DataTypes } = require('sequelize');
const http = require('http');
const moment = require('moment-timezone');
const utcOffset = 7 * 60; // UTC+7 in minutes
const currentDate = moment().add(7,'h');

var app = express();
app.use(bodyParser.json());
// Allow all CORS requests
app.use(cors());
app.get('/', function (req, res) {
    res.send('Welcome to temperature capture!');
});
app.post('/temps', async function (req, res) {
    try {
        const { body } = req;
        console.log(body)
        var result = await temps.create({
            sn: body.sn,
            temp_value: body.temp_value,
            temp_datetime: currentDate
        })
        res.status(200).json({ status: 'success', message: 'Data saved.', data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Data save faild.', data: error })
    }
});
app.get('/temps', async function (req, res) {
    try {
        const { body } = req;
        console.log(body)
        var result = await temps.findAll()
        res.status(200).json({ status: 'success', message: 'Data loaded.', data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Data load faild.', data: error })
    }
});

app.get('/temps_by_sn', async function (req, res) {
    try {
        const startDate = moment().add(-1,'h').utcOffset(utcOffset);
         const endDate = moment().utcOffset(utcOffset);   // Replace with your end date
        const { query } = req;
        // console.log('GEt data %d Start date %d End Date %d',query.sn,startDate,endDate)
        const result = await temps.findAll({
            where: {
                sn:query.sn,
                temp_datetime:{[Op.between]:[startDate,endDate]}
            },
        })
        res.status(200).json({ status: 'success', message: 'Data loaded.', data: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Data load faild.', data: error })
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

async function createtemp() {
    try {

        var result = await temps.create({
            sn: "SNDEMO01",
            temp_value: (Math.random()).toString(),
            temp_datetime: currentDate
        })
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

setInterval(() => {
    createtemp();
}, 1000 * 60);
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
    sn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    temp_datetime: {
        type: DataTypes.DATE,
    }
});

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
