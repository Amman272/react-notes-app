import db from './db.js'

import { Router } from 'express'
const router=Router();
router.post('/newNotes',async (req,res)=>{
    const{title,id}=req.body;
    try{
       await db.query('insert into notes (title, user_id)values ($1 ,$2)',[title,id]);
        console.log("created succfully")
    }catch(error){
    console.log(`not created`,error)
}
})
router.post('/gettitles', async (req,res)=>{
    const {id}=req.body;
    try{
        const result=await db.query("select title,note_id from notes where user_id=$1",[id]);
        if(result.rows.length>0){
            res.json({
                titles:result.rows.map(row=>row.title.trim()),
                  ids:result.rows.map(row=>row.note_id)
            })
            console.log(result.rows.map(row=>row.title.trim()));
console.log(result.rows.map(row=>row.note_id));

        }
    }catch(error){
        console.log(error)
    }
})



router.post('/removeNote', async (req,res)=>{
    const{id,user}=req.body
    try {
         await db.query("delete from notes where note_id=$1 and user_id=$2",[id,user])
    } catch (error) {
    res.status(200).send({ message: "Note deleted successfully" });
    }
   
})
export default  router