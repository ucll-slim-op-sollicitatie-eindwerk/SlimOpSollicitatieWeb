const {Pool} = require('pg')
const pool = new Pool({
    user: 'civracsv',
    host: 'dumbo.db.elephantsql.com',
    database: 'civracsv',
    password: 'vlubeHQ53ZlJ0XLNHnHvk_SyRDW0MIME',
    port: 5432,
})

/**
let x = "";
function printName() {
    pool.query('select * from slimopsol.users', (err, res) => {
        let result = res.rows[0].username
        if (result != null) {
            x = result
            console.log(result + " --> result from Query")
            return result
        } else pool.end()
    })
    return x;
}

printName()

async function log() {
    await new Promise(r => setTimeout(r, 2000));
    console.log("TEST= " + x)
}

log()
*/

login("arnobunckens@hotmail.com", "t")

 function login(email, password){
    pool.query('select * from slimopsol.users where email = '+ "'" + email + "'", (err, res) => {
        console.log(res.rows[0].email)
        console.log(res.rows[0].hashedpassword)
        let uname = res.rows[0].email
        let pw = res.rows[0].hashedpassword
        if(uname === email && password === pw){
            console.log("Ingelogd")
        } else console.log("Login failed")
        pool.end()
    })
}


