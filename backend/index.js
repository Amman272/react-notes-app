import express from "express";
import cors from "cors"
import pg, { Result } from "pg";

import loginRoutes from "./login.js";
import noteRoutes from "./notes.js";
import aiRoutes from "./ai.js";

const app= express();
const port = 3000;





;

app.use(cors());
app.use (express.json());
app.use('/login', loginRoutes);
app.use('/notes' ,noteRoutes)
app.use('/ai' ,aiRoutes)


app.listen(port,()=>{
    console.log("runinggg ")
})