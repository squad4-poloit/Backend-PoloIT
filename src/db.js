import mysql from "mysql2/promise";

// create the connection to database
const db_config_init = {
  host: "db-mysql",
  port: 3306,
  user: "root",
  password: 'password'
};
const db_config = {
  host: "db-mysql",
  port: 3306,
  user: "root",
  password: 'password',
  database: 'example'
};

async function verifyConnection(connection) {
  try {
    const conn = await connection.getConnection();
    console.log("MySQL Connected");
    conn.release();
  } catch (err) {
    console.error("MySQL Connection Error:", err);
  }
}

const init_db = async (pool) => {
  try {
    // Crea la base de datos
    await pool.query('CREATE DATABASE IF NOT EXISTS example');
    console.log('Base de datos "example" creada o ya existe.');

    // Usa la base de datos
    await pool.query('USE example');
    console.log('Usando la base de datos "example".');

    // Crea la tabla "animales"
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS animales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        especie VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(createTableQuery);
    console.log('Tabla "animales" creada o ya existe.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Cierra el pool cuando termines
    pool.end();
    console.log('Cierre del pool de conexiones con la base de datos');
  } 
}

// export const connection = mysql.createConnection(db_config);
const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      const pool =  mysql.createPool(db_config_init);
      console.log('Conexión exitosa a MySQL');
      connected = true;
      await init_db(pool);
      pool.end();
    } catch (err) {
      console.error('Error conectando a MySQL, reintentando en 5 segundos...', err);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

await connectWithRetry();

export const connection = mysql.createPool(db_config);
verifyConnection(connection);

