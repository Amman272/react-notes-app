import React from "react";
import { Link } from "react-router-dom";
import '../styles/Welcome.css';

function Welcome() {
    return (
        <div className="welcome-container">
            <div className="nav"> 
                <p>NoteVault</p>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>✨ Your Ideas Matter</span>
                    </div>
                    <h1 className="hero-title">Your Digital Mind Palace</h1>
                    <p className="hero-subtitle">Capture, organize, and transform your thoughts into something extraordinary. Experience note-taking reimagined.</p>
                    
                    <div className="hero-actions">
                        <Link to="/login" className="primary-cta">
                            <button>Start Your Journey</button>
                        </Link>
                        <Link to="/features" className="secondary-cta">
                            <button>Explore Features</button>
                        </Link>
                    </div>
                </div>
                
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="card-content">
                            <div className="card-icon">📝</div>
                            <span>Quick Notes</span>
                        </div>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-content">
                            <div className="card-icon">🧠</div>
                            <span>Smart Organization</span>
                        </div>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-content">
                            <div className="card-icon">⚡</div>
                            <span>Lightning Fast</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="features-preview">
                <div className="feature-item">
                    <div className="feature-icon">🎨</div>
                    <h3>Beautiful Interface</h3>
                    <p>Designed for focus and clarity</p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your thoughts, protected always</p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🚀</div>
                    <h3>Blazing Fast</h3>
                    <p>No lag, just pure productivity</p>
                </div>
            </div>
            
            <footer>
                {/* Footer content is handled by CSS ::after pseudo-element */}
            </footer>
        </div>
    );
}

export default Welcome;