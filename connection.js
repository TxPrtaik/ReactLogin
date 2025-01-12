let mysql=require('mysql');
let util=require("util");
let con=mysql.createConnection({
    "host":"brmmxrbvgwldmkgbnonc-mysql.services.clever-cloud.com",
    "user":"ute2sat473mcvpdy",
    "password":"8a73S9WHIR2E7AJPMHlp",
    "database":"brmmxrbvgwldmkgbnonc"
})
module.exports=util.promisify(con.query).bind(con);
