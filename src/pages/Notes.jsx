import { useState } from "react";
import Nav from "../components/Nav";
import "../styles/Notes.css";

import axios from "axios";
function Notes() {
  const [popup, setpopup] = useState(false);
  const [text, settext] = useState("");

  async function handleCreate() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    try {
      await axios.post("http://localhost:3000/notes/newNotes", {
        title: text,
        id: id,
      });
      setpopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="leftside">
          <p>notes here</p>

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
            <button onClick={handleCreate}>create</button>
          </div></div>
        )}
      </div>
    </>
  )
}

export default Notes;
