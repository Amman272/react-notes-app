import { Router } from "express";
import db from './db.js'
const router=Router();
router.post('/', async(req , res)=>{
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
    res.status(500).send({ message: error });
}
    }else{
        try {
           let result=await db.query('select * from users where email=$1',[email])
            if(result.rows.length>0 && result.rows[0].password===password){
                console.log(result.rows)
               res.json({
                        email: result.rows[0].email,
                          name: result.rows[0].name,
                          id:result.rows[0].id
});     
                console.log('data sent to frontend')
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error });

        }
    }
}

)
export default  router