import "../styles/Nav.css";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function logout() {
    localStorage.clear();
    navigate("/");
  }
 return (
    <>
      <ThemeToggle />
      <nav className="nav-bar">
        <div className="nav-content">
          <span className="nav-logo">NoteVault</span>
          <span className="nav-user">
            {user?.name ? `Welcome, ${user.name}` : ""}
          </span>
          <button className="nav-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
