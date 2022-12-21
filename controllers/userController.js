const {success, error} = require('./../utiles/responser')
const sqlite =require("sqlite3");

const db =new sqlite.Database( './db/data.db',sqlite.OPEN_READWRITE,(err)=>{ if (err) return console.error(err.message)})
let sql;
const getAlldata =  (req,res)=>{db.all('SELECT * FROM posts',(err , data) => {
        if(err) return err.message
        if(data.length<1)
      return res.status(500).json(error(500,"Something went wrong"))
      return res.status(200).json(success(200, data,"OK"))

    
    })

}

const newData =  async (req,res)=>{
    let {title,text} = req.body;
    sql ="INSERT INTO posts (title ,text) VALUES (?,?)"
    try {

         await db.run(sql,[title,text],(err)=>
        { if (err) return console.error(err.message)   
             return console.log(`A row has been inserted ${title}${text} `)   
             ;
    });

        return res.status(201).json({status:201,success:true
        })
    } catch (error) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}
module.exports = {
    getAlldata,
    newData };