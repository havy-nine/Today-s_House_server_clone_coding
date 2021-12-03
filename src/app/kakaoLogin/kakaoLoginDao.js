const { pool } = require("../../../config/database");

async function getEmail(email) {
    const connection = await pool.getConnection((async(conn)=> con));

    const getEmailQuery = 'select email, userId from user where email = ?;';

    const getEmailRows = await connection.query(getEmailQuery, email);
    connection.release();
    //console.log(getEmailRows[0]);
    return getEmailRows[0];

}
module.exports = {
    getEmail
}