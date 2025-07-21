import db from "./db.js";

import { Router } from "express";
const router = Router();
router.post("/newNotes", async (req, res) => {
  const { title, id } = req.body;
  try {
    await db.query("insert into notes (title, user_id)values ($1 ,$2)", [
      title,
      id,
    ]);
    console.log("created succfully");
     res.status(200).json({ message: "Note updated successfully. from edit note" });
  } catch (error) {
    console.log(`not created`, error);
  }
});
router.post("/gettitles", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.query(
      "select title,note_id from notes where user_id=$1",
      [id]
    );
    if (result.rows.length > 0) {
      res.json({
        titles: result.rows.map((row) => row.title.trim()),
        ids: result.rows.map((row) => row.note_id),
      });
      console.log(result.rows.map((row) => row.title.trim()));
      console.log(result.rows.map((row) => row.note_id));
    }
    else{
        res.json({
        titles:[],ids:[]
    })

    }
    res.status(201).json({ message: "titles done" }); // Use 201 
  } catch (error) {
    console.log(error);
    res.status(500).json({
        titles:[],ids:[]
    });
  }
});

router.post("/removeNote", async (req, res) => {
  const { id, user } = req.body;
  try {
    await db.query("delete from notes where note_id=$1 and user_id=$2", [
      id,
      user,
    ]);
    res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "error in deleting" });
  }
});

router.post("/editnote", async (req, res) => {
  const { userID, noteID, content } = req.body;
  try {
    await db.query(
      "  update notes set content = $1 where user_id=$2 and note_id= $3",
      [content, userID, noteID]
    );
      res.status(200).json({ message: "Note updated successfully. from edit note" });
  } catch (error) {
    console.log(error);

  }
});

router.post("/getcontent", async (req, res) => {
  const { userID, noteID } = req.body;
  try {
    const result = await db.query(
      "select content from notes where user_id=$1 and note_id=$2",
      [userID, noteID]
    );
    console.log(result.rows);
    //res.json({content:result.rows[0].content});
  res.status(200).json({ content: result.rows[0].content });

  } catch (error) {
    console.log(error);
    
  }
});

router.post("/getNumTitle",async (req,res)=>{
  const userID= req.body.userID;
  try{
    const result= await db.query("select count(*) from notes where user_id =$1",[userID]);
    const count =result.rows[0].count
res.status(200).json({ count });

      }
  catch(e){
    console.log(e)
  }
})
router.post('/getall',async(req,res)=>{
    const userID= req.body.userID;
    try{
       const result= await db.query("select content from notes where user_id =$1",[userID]);
       const contents = result.rows.map(row => row.content || ""); // default to "" if null
    const totalLetters = contents.reduce((sum, text) => sum + text.length, 0);

    res.status(200).json({ totalLetters });
    }
    catch(e){
      console.log(e)
    }
})
export default router;
