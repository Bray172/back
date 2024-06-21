const mysql = require("mysql");

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Brayan#16",
  database: "productos",
});


conection.connect(err => {
    if(err) throw err
    console.log('conexión sucebool')
})


module.exports = conection