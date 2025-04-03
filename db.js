const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "metro.proxy.rlwy.net",
  user: "root", // <-- Cambia esto
  password: "QkhgqfgIfwsGQBFLWiKteJDTeNAAgQDr", // <-- Cambia esto
  database: "crm_tareas",
  port: "11427",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

module.exports = connection;
