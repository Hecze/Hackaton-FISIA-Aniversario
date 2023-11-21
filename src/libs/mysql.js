/*import mysql from 'serverless-mysql';

export const conn = mysql({
    config: {
        host: "viaduct.proxy.rlwy.net",
        user: "root",
        password: "a44256fD5gcd3gFdG65bcD14dEGfBDBD",
        port: 20048,
        database: "railway",
    },
});

*/
// @/libs/mysql

import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,
};

export async function connect() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
