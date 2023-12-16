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
  const q = "SELECT `Type_ID`, `Type_name`, `Is_perishable` FROM type WHERE User_Id = ?"
  const userID = 1000 //to be changed

  db.query(q,userID,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

});

app.get("/ingredients", (req,res)=>{
  const q = "SELECT `Inventory_ID`, `Name_inventory`, `Type_name`, `Pcs_inventory`, `Kg_inventory`, `Price`, `Expiration_date`, inventory.Type_ID FROM inventory INNER JOIN type ON inventory.Type_ID = type.Type_ID WHERE inventory.User_ID = ?"
  const userID = 1000 
  db.query(q,userID,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

});

app.get("/ingredientsDropdown", (req,res)=>{
  const q = "SELECT `Inventory_ID`, `Name_inventory` FROM inventory WHERE User_Id = ?"
  const userID = 1000 

  db.query(q,userID,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })

});

app.get("/wastes", (req,res)=>{
  const q = "SELECT `Waste_ID`, `Name_inventory`, waste.Inventory_ID,  `Type_name`, `Kg_waste`, `Pcs_waste`, `Price`, inventory.Type_ID FROM waste INNER JOIN inventory ON waste.Inventory_ID = inventory.Inventory_ID INNER JOIN type ON inventory.Inventory_ID = type.Type_ID"

  db.query(q,(err,data)=>{
    if(err) console.log(err)
    return res.json(data)
  })

});

//ok na ito sa ngayon
app.post("/addInventory", (req,res)=>{
  // add usrID dito sa select
  const q1 = "SELECT * FROM `inventory` WHERE `User_id` = ? AND `Name_inventory` = ?"
  const q2 = "INSERT INTO `inventory` (`User_id`, `Type_ID`, `Name_inventory`,`Kg_inventory`, `Pcs_inventory`, `Price`, `Expiration_date`) VALUES (?)"
  const userID = 1000
  
  const values = [
    userID,
    req.body.typeId,
    req.body.ingredient,
    req.body.weight,
    req.body.pieces,
    req.body.price,
    req.body.expiration,
  ];

  console.log(values)
  //Check if ingredient already exists.
  db.query(q1, [userID, req.body.ingredient], (err,data)=>{
    if(err){
      console.log("1")
      return res.json(err)
    }else if(data.length>0){
      console.log("2")
      return res.json("Failed")
    }else{
      //Insert new ingredient.
      console.log("3")
      db.query(q2, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
      })
    }
  })

});

app.post("/addWaste", (req,res)=>{
  const q1 = "SELECT `Inventory_ID` FROM `waste` WHERE `Inventory_ID` = ? AND User_id = ? "
  const q2 = "INSERT INTO `waste` (`User_id`,`Kg_waste`,`Pcs_waste`, `Inventory_ID`) VALUES (?)"
  const userID =  1000

  const values = [
    userID,
    req.body.weight,
    req.body.pieces,
    req.body.inv_id,
  ];

  //Check if ingredient is already in the waste table.
  db.query(q1, [req.body.inv_id, userID], (err,data)=>{
    if(err){
      console.log(err)
    }else if(data.length>0){
      return res.json("Failed")
    }else{
      //Insert new waste.
      db.query(q2, [values], (err,data)=>{
        if(err) console.log(err)
        return res.json(data)
      })
    }
  })

});

app.post("/addType", (req,res)=>{
  const q1 = "SELECT `Type_name` FROM `type` WHERE `Type_name` = ? AND User_id = ? "
  const q2 = "INSERT INTO `type` (`User_id`,`Is_perishable`,`Type_name`) VALUES (?)"
  const userID =  1000
  const isPerishable = (req.body.current_ISPERISHABLE == false) ? 0 : 1;

  const values = [
    userID,
    isPerishable,
    req.body.current_TYPENAME
  ];

  //Check if waste type already exists.
  db.query(q1, [req.body.current_TYPENAME, userID], (err,data)=>{
    if(err){
      return res.json(err)
    }else if(data.length>0){
      return res.json("Failed")
    }else{
      //Insert new type.
      db.query(q2, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
      })
    }
  })

});

app.post("/deleteType", (req,res)=>{
  const q = "DELETE FROM type WHERE User_id = ? AND Type_ID = ? "
  const userID =  1000

  //Delete type of waste
  db.query(q, [userID, req.body.current_ID], (err,data)=>{
    if(err){
      return res.json(err)
    }else{
      return res.json(data)
    }
  })

});

app.post("/deleteInventory", (req,res)=>{
  const q = "DELETE FROM inventory WHERE User_id = ? AND Inventory_ID = ? "
  const userID =  1000

  //Delete type of waste
  db.query(q, [userID, req.body.id], (err,data)=>{
    if(err){
      return res.json(err)
    }else{
      return res.json(data)
    }
  })

});

app.post("/updateType", (req,res)=>{
  const q = "UPDATE type SET ? WHERE User_id = ? AND Type_ID = ?"
  const userID =  1000
  const isPerishable = (req.body.current_ISPERISHABLE == false) ? 0 : 1;

  const values = {
    Is_perishable: isPerishable,
    Type_name: req.body.current_TYPENAME,
  };


  //Update selected type of waste
  db.query(q, [values, userID, req.body.current_ID], (err,data)=>{
    if(err){
      return res.json(err)
    }else{
      return res.json(data)
    }
  })

});

app.post("/updateInventory", (req,res)=>{
  const q = "UPDATE inventory SET ? WHERE User_id = ? AND Inventory_ID = ?"
  const userID =  1000

  const values = {
    Name_inventory: req.body.ingredient,
    Kg_inventory: req.body.weight,
    Pcs_inventory: req.body.pieces,
    Price: req.body.price,
    Expiration_date: req.body.expiration,
    Type_ID: parseInt(req.body.typeId)
  };


  //Update selected type of waste
  db.query(q, [values, userID, req.body.id], (err,data)=>{
    if(err){
      console.log(err)
      return res.json(err)
    }else{
      return res.json(data)
    }
  })

});

app.post("/updateWaste", (req,res)=>{
  const q = "UPDATE waste SET ? WHERE User_id = ? AND Waste_ID = ?"
  const userID =  1000

  const values = {
    User_id: userID,
    Waste_ID: req.body.weight,
    Kg_waste: req.body.weight,
    Pcs_waste: req.body.pieces,
    Inventory_ID: inv_id
  };


  //Update selected type of waste
  db.query(q, [values, userID, req.body.id], (err,data)=>{
    if(err){
      console.log(err)
      return res.json(err)
    }else{
      return res.json(data)
    }
  })

});


app.listen(8081, () => {
  console.log("Connected to backend");
});