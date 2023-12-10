import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json());
app.use(cors());
app.use(cookieParser())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foodwastedb",
});

app.post("/login", (req,res)=>{
  const q = "SELECT * FROM user WHERE `Username` = ? and `Password` = ?"

  db.query(q,[req.body.username, req.body.password], (err,data)=>{
    if(err) return res.json(err)

    if(data.length>0){
      res.cookie('userid', data[0].User_id);
      res.cookie('username', data[0].Username);
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

app.get("/types", (req,res)=>{
  const q = "SELECT `Type_ID`, `Type_name`, `Is_perishable` FROM type"

  db.query(q,(err,data)=>{
    if(err) return res.json(err)

    if(data[0].Is_perishable==0){
      data[0].Is_perishable="false"
    }else{
      data[0].Is_perishable="true"
    }

    return res.json(data)
  })

});

app.get("/ingredients", (req,res)=>{
  const q = "SELECT `Inventory_ID`, `Name_inventory`, `Type_name`, `Pcs_inventory`, `Kg_inventory`, `Price`, `Expiration_date` FROM inventory INNER JOIN type ON inventory.Type_ID = type.Type_ID;"

  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

});

app.get("/wastes", (req,res)=>{
  const q = "SELECT `Waste_ID`, `Name_inventory`, waste.Inventory_ID, `Type_name`, `Kg_waste`, `Pcs_waste`, `Price` FROM waste INNER JOIN inventory ON waste.Inventory_ID = inventory.Inventory_ID INNER JOIN type ON inventory.Inventory_ID = type.Type_ID;"

  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

});


app.post("/addType", (req,res)=>{
  const q1 = "SELECT `Type_name` FROM `type` WHERE `User_id` = ? and `Type_name` = ? "
  const q2 = "INSERT INTO `type` (`User_id`,`Is_perishable`,`Type_name`) VALUES (?)"
  const userID =  req.cookies['userid']
  const isPerishable = req.body.current_ISPERISHABLE == "false" ? 0 : 1;
  console.log("userid:", req.cookies)
  console.log("perishable:", isPerishable)
  const values = [
    userID,
    isPerishable,
    req.body.type
  ];

  //Check if waste type already exists.
  db.query(q1, userID, req.body.current_TYPENAME, (err,data)=>{
    if(err){
      res.status(500).json(err);
    }else if(data.length>0){
      return res.json("Failed")
    }else {
      //Insert new type.
      console.log("HERE")
      // db.query(q2, [values], (err,data)=>{
      //   if(err) return res.json(err)
      //   return res.json(data)
      // })

    }
  })

});



app.listen(8081, () => {
  console.log("Connected to backend");
});