const {error} = require('./../utiles/responser')
const sqlite =require("sqlite3");
const jwt = require('jsonwebtoken')
require('dotenv').config()

 const db = new sqlite.Database( './db/data.db',sqlite.OPEN_READWRITE,(err)=>{
        if (err) return console.error(err.message)})
const checkUserDuplicate = async (req,res, next)=>{
   
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
               next(); 
               return
            }
    
         return res.status(404).json(error(404,"already exists"))
        } catch (err) {
            console.error(err)
            return res.status(500).json(error(500,"Server Side Error"))
     
        }
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const verifyToken = async (req, res, next)=>{
    let token = req.headers['authorization']
    console.log('token in verifyJWT mw is: ',token)
    console.log('sif in verifyJWT mw is: ',JWT_SECRET_KEY)


      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {token=token.split(' ')[1]
        const decoded = jwt.verify(token,JWT_SECRET_KEY);
        req.user = decoded;
        console.log("asdawewewa",decoded)
      } catch (err) {
        return res.status(401).send(err);
      }
      return next();
    };
    




module.exports = {checkUserDuplicate,verifyToken}