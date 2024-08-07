import mysql from "mysql2/promise";

// create the connection to database
const db_config = {
  host: "mimysql",
  port: 3306,
  user: "root",
  password: 'password',
  database: 'animales'
};

// export const connection = mysql.createConnection(db_config);
export const connection = mysql.createPool(db_config);


async function verifyConnection() {
  try {
    const conn = await connection.getConnection();
    console.log("MySQL Connected");
    conn.release();
  } catch (err) {
    console.error("MySQL Connection Error:", err);
  }
}

verifyConnection();