const sqlite =require("sqlite3");
let sql;
const db =new sqlite.Database((`${__dirname}/data.db`),sqlite.OPEN_READWRITE,(err)=>{ if (err) return console.error(err.message)})
db.run(`CREATE TABLE user(ID INTEGER PRIMARY KEY,username NOT NULL,password VARCHAR(255) NOT NULL)`);
db.run(`CREATE TABLE posts(ID INTEGER PRIMARY KEY,title,text)`);
console.log("data seeded")
db.close();