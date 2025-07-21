import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../styles/Notes.css";
import ContentBox from "../components/ContentBox";
import axios from "axios";

function Notes() {
  useEffect(() => {
    getNotesTitle();
  }, []);


  const [popup, setpopup] = useState(false);
  const [text, settext] = useState("");
  const [titles, setttiles] = useState([]);
  const [notedata, setnotedata] = useState([]);
  const [selectedNote, SetselectedNote] = useState(null);
  const [content, setcontent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  // //////////////////////////////////////////////////////////////
    useEffect(() => {
  if (selectedNote !== null) {
    getContent();
  }
}, [selectedNote]); 
/////////////////////////////////////////

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


  async function handleCreate() { 
    console.log('functionclicked')
  try {
    await axios.post("http://localhost:3000/notes/newNotes", {
      title: text,
      id: user.id,
    });
    
    await getNotesTitle(); // Fetch updated list BEFORE UI updates
    console.log('try excuated');
  } catch (error) {
    console.log(error);
  } finally {
    setpopup(false); // Move UI update here
    settext("");
    console.log('finally excuated');
  }
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
    

      
       await getNotesTitle();
       if(selectedNote===note_id){
        SetselectedNote===note_id;
        setcontent("")
       }
    } catch (error) {
      console.log(error);
      getNotesTitle();
    } finally {
      console.log("finallly block excuated");
    }
  }
  async function getContent() {
    //setcontent("loading....")
    try {
      const res = await axios.post("http://localhost:3000/notes/getcontent", {
        noteID: selectedNote,
        userID: user.id,
      });
      console.log(res.data);
     setcontent(res.data.content);
      console.log('set content triggered')
    } catch (error) {}
  }
  function handleSetContent(content) {
    setcontent(content);
  }
  return (
    <>
      <Nav />
    
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
                   
                  }}
                >
                  <p>
                    {note.note_id} {note.title}{" "}
                    <button onClick={(e) => { e.stopPropagation();
                    removeNote(note.note_id)}}>❌</button>
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
          <ContentBox
            note_id={selectedNote}
            content={content}
            onContent={handleSetContent}
          />
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
