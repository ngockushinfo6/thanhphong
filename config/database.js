const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('Lỗi kết nối tới MySQL: ' + err);
    } else {
        console.log('Kết nối tới MySQL thành công với ID: ' + connection.threadId);
    }

});

module.exports = {
    insertDatabase: function(table, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = new Array(values.length).fill('?').join(', ');
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values, function(error, results, fields) {
                if (error) resolve(false);
                resolve(true);
            });
        });
    },
    updateDatabase: function(table, data, where) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE ${table} SET ${data} WHERE ${where}`, function(error, results, fields) {
                if (error) resolve(false);
                resolve(true);
            });
        });
    },
    getDatabase: function(table, where) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} WHERE ${where}`, function(error, results, fields) {
                if (error) resolve(false);
                resolve(results[0]);
            });
        });
    },
    orderDatabase: function(table, where) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} WHERE ${where}`, function(error, results, fields) {
                if (error) resolve(false);
                resolve(results);
            });
        });
    },
    getTotalDatabase: function(table, where) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM ${table} WHERE ${where}`, function(error, results, fields) {
                if (error) resolve(false);
                resolve(results[0].total);
            });
        });
    },
    checkConnect: function() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM fb_config`, function(error, results, fields) {
                if (error) resolve(false);
                resolve(results[0].total);
            });
        });
    }
}