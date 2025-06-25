
import'../styles/Nav.css';
function Nav(){
     const user=JSON.parse(localStorage.getItem("user"));
    return(
    <div>
        <div  className="bg">
        <p>My Notes app</p>
        <p>wellcome {user.name}</p>
        <p>about me</p>
        <button> log out</button>

        </div>
        
    </div>
    )
}
export default Nav