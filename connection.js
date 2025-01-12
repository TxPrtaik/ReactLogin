let mysql=require('mysql');
let util=require("util");
let con=mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"react_login"
})
module.exports=util.promisify(con.query).bind(con);