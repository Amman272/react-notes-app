import axios from "axios";
import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import '../styles/simpleeditor.css'

function SimpleEditor(props) {
  //const [content, setcontent] = useState("");

  async function saveText() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.id;

    try {
    const res= await axios.post("http://localhost:3000/notes/editNote", {
        userID: userID,
        noteID: props.note_id,
        content: props.content,
      });
      console.log(res.data.message); //  "Note updated successfully."
      alert(res.data.message);
    } catch (error) {}
  }

  return (
  
    <div className="simple-editor-root">
      <button className="simple-editor-save-btn" onClick={saveText}>Save</button>
   <div className="simple-editor-box">        <EditorProvider>
          <Editor
            value={props.content}
            onChange={(e) => props.onContent(e.target.value)}
            
          />
        </EditorProvider>

        <div className="simple-editor-preview"
        
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default SimpleEditor;
