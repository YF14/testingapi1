let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
const sqlite =require("sqlite3");
const {validationResult} = require('express-validator')

const {success, error} = require('./../utiles/responser')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

require('dotenv').config()
const db =new sqlite.Database( './db/data.db',sqlite.OPEN_READWRITE,(err)=>{
     if (err) return console.error(err.message)})

const signup = async (req, res)=>{ 
    let errors = validationResult(req).array();
    if(errors && errors.length>0)
    {
        return res.status(400).json(error(400,errors))
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password,10)
    let username=req.body.username;
    let sql ="INSERT INTO user (username ,password) VALUES (?,?)"
    try {
         await db.run(sql,[username,hashedPassword],(err)=>
        { if (err) return console.error(err.message)   
             return console.log(`done`);
    })
 
        return res.status(201).json({status:201,success:true
    })} 
    catch (err) {
        console.log(err)
        return res.status(500).json(error(500,"Something went wrong"))
    }    
}


const signin = async (req, res)=>{
    let errors = validationResult(req).array();
    if(errors && errors.length>0)
    {
        return res.status(400).json(error(400,errors))
    }
    function fetch () {
    return new Promise ((resolve, reject) => {
        let username=req.body.username;
        db.get('SELECT username ,password,ID FROM user WHERE username = ?', [username], (err,row)=>{if(err) reject (err );
            resolve( row);})
    });
}
    try {
        const result = await fetch ();
       if(!result)
        {
            return res.status(404).json(error(404,"Not Found"))
        }

           let ok = await bcrypt.compare(req.body.password, result.password)
           console.log("ok",ok)
           console.log("ok1",req.body.password)
           console.log("ok2",result.password)


        if(!ok)
            return res.status(401).json(error(401,"Invalid Password"))
            console.log(JWT_SECRET_KEY)
      let token = jwt.sign({
            id:result.ID,
        },JWT_SECRET_KEY,{
            expiresIn:3600// 1 hour
        })
        return res.status(200).json(success(200,{
            id:result.ID,
            username:result.username,
            token:token
        },"Registered Successfully"))

    } catch (err) {
        console.error(err)
        return res.status(500).json(error(500,"Server Side Error"))

    }

}
module.exports = {signup, signin}