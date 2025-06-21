import express from "express";
import cors from "cors"
import pg, { Result } from "pg";
import { data } from "react-router-dom";
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
    await db.query('insert into users(name,email,password) values ($1,$2,$3)',[name,email,password])
    res.status(201)
    res.send("succesfull")
    console.log("done user reg")
    
} catch (error) {
 res.status(500)
   console.log(error)
}
    }else{
        try {
           let result=await db.query('select * from users where email=$1',[email])
            if(result.rows.length>0 && result.rows[0].password===password){
                console.log(result.rows)
               res.json({
                        email: result.rows[0].email,
                          name: result.rows[0].name
});
                console.log('data sent to frontend')
            }
        } catch (error) {
            console.log(error)
        }
    }
})


app.listen(port,()=>{
    console.log("runinggg ")
})