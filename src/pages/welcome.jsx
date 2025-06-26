import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`welcome-root${darkMode ? " dark" : ""}`}>
      <nav className="nav">
        <span className="logo">NoteVault</span>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <Link to="/login">
            <button className="nav-btn" aria-label="Login">
              Login
            </button>
          </Link>
        </div>
      </nav>

      <main className="hero">
        <section className="hero-content">
          <h1>Your Digital Mind Palace</h1>
          <p>
            Capture, organize, and transform your thoughts. Minimal, secure, and lightning fast.
          </p>
          <div className="hero-actions">
            <Link to="/login">
              <button className="primary-btn">Get Started</button>
            </Link>
            <Link to="/features">
              <button className="secondary-btn">Features</button>
            </Link>
          </div>
        </section>
        <section className="hero-visual">
          <div className="glass-card card-1" aria-label="Quick Notes">
            <span role="img" aria-label="Note" className="card-icon">📝</span>
          </div>
          <div className="glass-card card-2" aria-label="Smart Organization">
            <span role="img" aria-label="Brain" className="card-icon">🧠</span>
          </div>
          <div className="glass-card card-3" aria-label="Lightning Fast">
            <span role="img" aria-label="Lightning" className="card-icon">⚡</span>
          </div>
        </section>
      </main>

      <section className="features-row">
        <div className="feature glass-card">
          <span role="img" aria-label="Design" className="feature-icon">🎨</span>
          <span>Minimal Design</span>
        </div>
        <div className="feature glass-card">
          <span role="img" aria-label="Lock" className="feature-icon">🔒</span>
          <span>Private & Secure</span>
        </div>
        <div className="feature glass-card">
          <span role="img" aria-label="Rocket" className="feature-icon">🚀</span>
          <span>Instant Sync</span>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} NoteVault</span>
      </footer>
    </div>
  );
}

export default Welcome;
