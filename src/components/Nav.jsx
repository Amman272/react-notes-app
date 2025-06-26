import "../styles/Nav.css";
import { useNavigate } from "react-router-dom";
function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function logout() {
    localStorage.clear();
    navigate("/");
  }
 return (
    <nav className="nav-bar">
      <div className="nav-content">
        <span className="nav-logo">My Notes App</span>
        <span className="nav-user">
          {user?.name ? `Welcome, ${user.name}` : ""}
        </span>
        <button className="nav-btn" onClick={logout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Nav;
