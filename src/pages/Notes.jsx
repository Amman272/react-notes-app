import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles/Notes.css";
import ContentBox from "../components/ContentBox";
import axios from "axios";
import { div, p } from "framer-motion/client";

function Notes() {
  useEffect(() => {
    getNotesTitle();
  }, []);

  const [popup, setpopup] = useState(false);
  const [text, settext] = useState("");
  const [titles, setttiles] = useState([]);
  const [notedata, setnotedata] = useState([]);
  const [selectedNote, SetselectedNote] = useState(null);
  // //////////////////////////////////////////////////////////////
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
    } finally {
      await getNotesTitle();
    }
  }

  async function getNotesTitle(params) {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    let result;
    try {
      result = await axios.post("http://localhost:3000/notes/gettitles", {
        id: id,
      });

      // console.log(data.data.titles);
      // console.log(data.data.ids);
      console.log("try block done");

      // Zip the two arrays into a single array of objects
    } catch (error) {
      console.log(error);
    }

    console.log("zipping data");
    const zipped = result.data.titles.map((title, index) => ({
      note_id: result.data.ids[index],
      title: title,
    }));
    console.log("going to send data to setnote data");
    setnotedata(zipped);
    console.log("sent data to setnote data");
  }

  async function removeNote(note_id) {
    console.log("delete button clicked and function called");
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      console.log("trying to post");
      await axios.post("http://localhost:3000/notes/removeNote", {
        id: note_id,
        user: user.id,
      });
      console.log("post done");

      console.log("note deleted");
      getNotesTitle();
    } catch (error) {
      console.log(error);
      await getNotesTitle();
    } finally {
      console.log("finallly block excuated");
    }
  }
  function contentEdit() {}

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
                <div
                  key={note.note_id}
                  onClick={() => {
                    SetselectedNote(note.note_id);
                    console.log(`selected note id ${note.note_id}`);
                  }}
                >
                  <p>
                    {note.note_id} {note.title}{" "}
                    <button onClick={() => removeNote(note.note_id)}>❌</button>
                  </p>
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
          <ContentBox note_id={selectedNote}/>
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
