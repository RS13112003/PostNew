require("dotenv").config();
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2")

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodoverride = require("method-override")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride("_method"))
app.use(express.static(path.join(__dirname, "public")));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  
});

// Home Route 
app.get("/postnest",(req,res)=>{
    let q = `select count(*) from user`;
    try{
    connection.query(q,(err,result)=>{
        if(err) throw(err);
        let count = result[0]['count(*)']
        console.log(count)
        res.render("home.ejs",{count})
    })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error in DB")
    }
})
// Create Route
app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/users/new",(req,res)=>{
    let id = faker.string.uuid();
    let {username,email,password,content} = req.body;
    let data = [id,username,email,password,content];
    let q = `insert into user (id,username,email,password,content) values (?)`;
    try{
        connection.query(q,[data],(err,result)=>{
        if(err) throw(err);
        console.log(result)
        res.redirect("/users")
    })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error is DB")
    }
})
// show Route
app.get("/users",(req,res)=>{
    let q = `select * from user order by created_at desc`;
    try{
    connection.query(q,(err,users)=>{
        if(err) throw(err);
        // console.log(users)
        res.render("show.ejs",{users});
    })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error in DB")
    }
})
// View Route
app.get("/users/:id/view",(req,res)=>{
    let {id} = req.params;
    let q = `select * from user where id='${id}'`;
    try{
    connection.query(q,(err,users)=>{
        let user=users[0];
        if(err) throw(err);
        console.log(user)
        res.render("view.ejs",{user});

    })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error in DB")
    }
})
// Edit Route
app.get("/users/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `select * from user where id='${id}'`;
    try{
    connection.query(q,(err,users)=>{
        if(err) throw(err);
        let user = users[0];
        console.log(user)
        res.render("edit.ejs",{user});
    })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error in DB")
    }
})
// Update Route
app.put("/users/:id/edit",(req,res)=>{
    let {id} = req.params;
    console.log(id)
    let {username:newuser,password:newpass,email:newemail,content:newcontent} = req.body;
    let q = `select * from user where id = '${id}' `;
    try{
        connection.query(q,(err,users)=>{
            if(err) throw(err);
            let user=users[0]; 
            console.log(user);
            if(newpass!=user.password) return res.redirect("/users?error=wrong_password");
            else{
                let q2 = `update user set username = '${newuser}', email = '${newemail}', content = '${newcontent}' where id = '${id}'`;
                connection.query(q2,(err,result)=>{
                    if(err) throw(err);
                    console.log("Username Changed")
                    res.redirect("/users?updated=true")
                })
            }
        })
    }catch(err){
        console.log("Error is -> ",err)
        console.log("Some error in DB")
    }
})
// Delete Route
app.get("/users/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `DELETE FROM user WHERE id = ?`
    connection.query(q, [id], (err) => {
        if (err) throw err;
        res.redirect("/users");
    });
});

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})


// Generate 100 fake posts

// let getRandomUser =()=>{
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.lorem.sentence({ min: 5, max: 20 }),
//     faker.internet.password()
//   ];
// }

//   inserting  100 fake posts

// let data=[];
// let q=`insert into user (id,username,email,content,password) values ?`
// for(let i=1;i<=100;i++){
//     data.push(getRandomUser())
// }
// try{
//     connection.query("q,[data]",(err,result)=>{
//         if(err) throw(err);
//         console.log(result);
//     })
// }catch(err){
//     console.log("Error is -> ",err)
//     console.log("Some error in DB")
// }
// connection.end();