import axios from "axios";
import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";

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
    <div>
      {" "}
      <button onClick={saveText}>Save</button>
      <div style={{ maxWidth: "600px", margin: "auto", marginTop: "40px" }}>
        <EditorProvider>
          <Editor
            value={props.content}
            onChange={(e) => props.onContent(e.target.value)}
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              border: "1px solid #444",
              padding: "10px",
              borderRadius: "10px",
              minHeight: "200px",
            }}
          />
        </EditorProvider>

        <div
          style={{
            background: "#111",
            padding: "10px",
            color: "#c0f6c0",
            borderRadius: "8px",
            marginTop: "20px",
          }}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default SimpleEditor;
