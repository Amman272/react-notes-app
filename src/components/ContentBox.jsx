import axios from "axios";
import React, { useState } from "react";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import "../styles/simpleeditor.css";
import { htmlToText } from 'html-to-text';
import { marked } from "marked";

function SimpleEditor(props) {
  //const [content, setcontent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [Aipop, setAipop] = useState(false);
  async function saveText() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.id;

    try {
      const res = await axios.post("http://localhost:3000/notes/editNote", {
        userID: userID,
        noteID: props.note_id,
        content: props.content,
      });
      console.log(res.data.message); //  "Note updated successfully."
      alert(res.data.message);
    } catch (error) {}
  }

  async function handleSendPrompt() {
    setLoading(true);
    setAiResult("");

    try {
      const res = await axios.post("http://localhost:3000/ai/prompt", {
        prompt: prompt,
      });

      setAiResult(res.data.response || "No response from AI.");
      console.log("AI response:", res.data);
    } catch (err) {
      setAiResult("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="simple-editor-root">
      <div className="editor-actions">
        <button 
          className="editor-btn ai" 
          onClick={() => {
            setAipop(true);
            const html = props.content;
            const text = htmlToText(html);
            setPrompt(text);
          }}
        >
          🤖 Ask AI
        </button>
        <button className="editor-btn save" onClick={saveText}>
          💾 Save
        </button>
      </div>
      
      <div className="simple-editor-box">
        {" "}
        <EditorProvider>
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
                onClick={() => {
                  setAipop(false);
                  setPrompt("");
                }}
                title="Close"
                aria-label="Close popup"
              >
                ×
              </button>
              <h3>AI Assistant</h3>
              <div className="ai-popup-columns">
                {/* Prompt Column */}
                <div className="ai-popup-col">
                  <label>Prompt to AI:</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your prompt here..."
                  />
                  <div className="ai-popup-actions">
                    <button
                      className={`ai-popup-btn ${loading ? 'loading' : ''}`}
                      onClick={handleSendPrompt}
                      disabled={loading || !prompt.trim()}
                    >
                      {loading ? "Sending..." : "🚀 Send"}
                    </button>
                  </div>
                </div>
                {/* Result Column */}
                <div className="ai-popup-col">
                  <label>AI Result:</label>
                  <textarea
                    value={aiResult}
                    onChange={(e) => setAiResult(e.target.value)}
                    placeholder="AI result will appear here..."
                  />
                  <div className="ai-popup-actions">
                    <button
                      className="ai-popup-btn success"
                      onClick={() => {
                        const htmlResult = marked(aiResult);
                        props.onContent(htmlResult);
                        setAipop(false);
                      }}
                      disabled={!aiResult.trim()}
                    >
                      ✅ Copy to Notes
                    </button>
                  </div>
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
