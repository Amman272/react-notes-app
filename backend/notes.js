import db from './db.js'

import { Router } from 'express'
const router=Router();
router.post('/newNotes',async (req,res)=>{
    const{title,id}=req.body;
    try{
        db.query('insert into notes (title, user_id)values ($1 $2)',title,id)
        console.log("created succfully")
    }catch(error){
    console.log(`not created`,error)
}
})

export default  router