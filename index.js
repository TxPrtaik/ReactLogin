let express=require('express');
let mysql=require('mysql');
let passport=require("./passport")
let app=express();
let exe=require("./connection");
let cors=require('cors');
let session=require('express-session');
const { json } = require('body-parser');
app.use(
    session({
      secret: '1234',
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(cors())
app.use(passport.initialize());
app.use(passport.session()); // Ensures user is serialized and deserialized in the session
app.get("/",(req,res)=>{
    res.send("hello");
})
app.get('/auth/google',
    passport.authenticate('google', {   scope: ['openid', 'profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async(req, res) => {
    let verifyUser=await exe(`select*from users where email='${req.user.emails[0].value}'`)
    let d=""
    if(verifyUser.length==0){
                 d=await exe(`insert into users(name,email,image) values('${req.user.displayName}','${req.user.emails[0].value}','${req.user.photos[0].value}')`);
    d=d.insertId
                }
    else{
        d=await exe(`select*from users where email='${req.user.emails[0].value}'`);
      d= d[0].id
    }
    
     res.redirect(`http://localhost:3000/?user=${encodeURIComponent(d)}`)
   

    }
  );
  app.get("/get-user/:id",async(req,res)=>{
    let d=await exe(`select*from users where id='${req.params.id}'`)
    res.send(d[0]);
  })
app.listen(1010);