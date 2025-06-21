import Nav from "../components/Nav"
import'../styles/Notes.css';
function Notes (){

return(
    <>
        <Nav/>
        <div className="container">
            <div className="leftside">
                <p>notes here</p>


                {/* bottom */}
                <button>add new</button>
            </div>
            <div className="rightside">
<p>notes here</p>
            </div>
        </div>
    </>
)

}

export default Notes