import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles/Notes.css";

import axios from "axios";
import { div, p } from "framer-motion/client";


function Notes() {

useEffect(()=>{
getNotesTitle();
},[]);


  const [popup, setpopup] = useState(false);
  const [text, settext] = useState("");
  const [titles, setttiles] = useState([]);
  const [notedata, setnotedata] = useState([]);
  async function handleCreate() {
    setpopup(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    try {
      await axios.post("http://localhost:3000/notes/newNotes", {
        title: text,
        id: id,
      });
      
    } catch (error) {
      console.log(error);
    }finally{getNotesTitle();}
    
  }

  async function getNotesTitle(params) {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    try {
  let data = await axios.post("http://localhost:3000/notes/gettitles", {
    id: id,
  });

  console.log(data.data.titles);
  console.log(data.data.ids);

  // Zip the two arrays into a single array of objects
  const zipped = data.data.titles.map((title, index) => ({
    note_id: data.data.ids[index],
    title: title
  }));

  setnotedata(zipped);
    // try {
    //   let data = await axios.post("http://localhost:3000/notes/gettitles", {
    //     id: id,
    //   });
    //   console.log(data.data.titles);
    //   console.log(data.data.ids);

    //   setnotedata(data.data);
    // }
}catch (error) {
      console.log(error);
    }
    // data.data.map((value)=>{
    //   setnotedata(prevData=>({
    //     titles:[...prevData,value.titles],
    //     ids:[...prevData,value.ids]
    //   }))

    // })
  }

  return (
    <>
      <Nav />
      <button onClick={getNotesTitle}>refresh</button>
      <div className="container">
        <div className="leftside">
          {/* <p>notes here</p> */}
          <div className="title_elements">
            {notedata.map((note) => {
              return (
                <div key={note.note_id}>
                  <p>{note.note_id}  {note.title}</p>
                  <h3></h3>
                </div>
              );
            })}
          </div>

          {/* bottom */}
          <button
            onClick={() => {
              setpopup(true);
            }}
          >
            add new
          </button>
        </div>
        <div className="rightside">
          <p>notes here</p>
        </div>

        {popup && (
          <div className="popup-overlay">
            <div className="popup">
              <button
                className="close button"
                onClick={() => {
                  setpopup(false);
                }}
              >
                X
              </button>
              <p>enter the name of your new note</p>

              <input
                value={text}
                type="text"
                name="newnote"
                onChange={(event) => {
                  settext(event.target.value);
                }}
                placeholder="note title"
              />
              <button
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleCreate();
                  }
                }}
                onClick={handleCreate}
              >
                create
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Notes;
