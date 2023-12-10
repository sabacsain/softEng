import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foodwastedb",
});


app.get("/", (req,res)=>{
  res.json("hello backend");
});

app.post("/login", (req,res)=>{
  const q = "SELECT * FROM user WHERE `Username` = ? and `Password` = ?"

  db.query(q,[req.body.username, req.body.password], (err,data)=>{
    if(err) return res.json(err)

    if(data.length>0){
      return res.json("Success")
    } else {
      return res.json("Failed")
    }

  })

});

app.post("/signup", (req,res)=>{
  const q1 = "SELECT `Username` FROM user WHERE `Username` = ?"
  const q2 = "INSERT INTO user (`username`,`password`) VALUES (?)"

  const values = [
    req.body.username,
    req.body.password
  ];

  //Check if username already exists.
  db.query(q1, req.body.username, (err,data)=>{
    if(err) return res.json(err)

    if(data.length>0){
      return res.json("Failed")
    } else {
      //Insert new user.
      db.query(q2, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
      })

    }
  })

});


app.post("/users", (req,res)=>{
  const q = "SELECT `Username` FROM user WHERE `Username` = ?"
  const values = [
    req.body.username,
    req.body.password
  ];

  db.query(q, [values], (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
});

app.listen(8081, () => {
  console.log("Connected to backend");
});