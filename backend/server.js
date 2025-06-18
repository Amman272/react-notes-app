import express from "express";
import cors from "cors"
import pg from "pg";
const app= express();
const port = 3000;


const db = new pg.Client({
    user: "postgres",
  host: "localhost",
  database: "notes-app",
  password: "1111",
  port: 5432,

})

db.connect();

app.use(cors());
app.use (express.json());
 
app.post('/login',async(req,res)=>{
    const {email ,password,name}=req.body
    if(name){
try {
    await db.query('insert Values into users(name,email,password) values ($1,$2,$3)',[name,email,password])
    res.status(201)
    res.send("succesfull")
    console.log("done")
    
} catch (error) {
 res.status(500)
   console.log(error)
}
    }else{
        console.log('still working')
    }
})


app.listen(port,()=>{
    console.log("runinggg ")
})