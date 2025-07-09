import axios from "axios";
import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import '../styles/simpleeditor.css'
import { div } from "framer-motion/client";

function SimpleEditor(props) {
  //const [content, setcontent] = useState("");
  const [prompt, setPrompt] = useState("");
const [aiResult, setAiResult] = useState("");
const [loading, setLoading] = useState(false);

const [Aipop,setAipop]=useState(false);
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
function handleSendPrompt(){
setAipop(true)


}
  return (
  
    <div className="simple-editor-root">
      <button className="simple-editor-save-btn" onClick={saveText}>Save</button>
      <button className="simple-editor-save-btn" onClick={handleSendPrompt} >Ask AI</button>
   <div className="simple-editor-box">        <EditorProvider>
          <Editor
            value={props.content}
            onChange={(e) => props.onContent(e.target.value)}
            
          />
        </EditorProvider>
{Aipop && (
  <div className="ai-popup-overlay">
    <div className="ai-popup">
      <button
        className="ai-popup-close"
        onClick={() => setAipop(false)}
        title="Close"
        aria-label="Close popup"
      >
        ×
      </button>
      <div className="ai-popup-columns">
        {/* Prompt Column */}
        <div className="ai-popup-col">
          <label>Prompt to AI:</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
          />
          <button
            onClick={handleSendPrompt}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {/* Result Column */}
        <div className="ai-popup-col">
          <label>AI Result:</label>
          <textarea
            value={aiResult}
            onChange={e => setAiResult(e.target.value)}
            placeholder="AI result will appear here..."
          />
          <button
            onClick={() => {
              props.onContent(aiResult);
              setAipop(false);
            }}
            disabled={!aiResult.trim()}
          >
            Copy to Notes
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        
      </div>
    </div>
  );
}

export default SimpleEditor;
