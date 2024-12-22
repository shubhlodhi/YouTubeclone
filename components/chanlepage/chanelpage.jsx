import { useContext, useEffect, useState } from "react"
import "./chanle.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { newusercontext } from "../form/contextform";
import { toast } from "react-toastify";



function Chanelpage(){
      // Local state variables for managing input values and UI states

    const [chanelname , setchanelname] = useState("")
    const [chaelhandle , sethandle] = useState("")
    const [baner , setbaner] = useState("")
    const [datass  ,setdata] = useState()
    const[canc , setcancel] = useState(true)
    // Fetching user details from localStorage
    console.log(localStorage.getItem("token"))
    console.log(localStorage.getItem("user"))
    const owner = (localStorage.getItem("name"))
    const userid = (localStorage.getItem("userid"))
    const navi = useNavigate()
    console.log("userif" , userid)
    console.log("kl" , chanelname)
     // Fetch user data when the component mounts
  useEffect(async ()=>{
    const response = await fetch(`http://localhost:5100/getusers/${userid}`)
    const data = await response.json() 
    setdata(data)
  } , [])
      // Toggle the cancel state to show or hide the modal

   function closepage(){
    setcancel(!canc)
   }
       // Destructuring `setnew` from the context to update global state

   const {setnew} = useContext(newusercontext)

  
  console.log("suuh" , datass)
      // Handle form submission to create a channel


    async function handle(e){
        e.preventDefault()
        if(!chanelname){
            return "chanel name is required "
        }
                // POST request to create a channel

        const response = await fetch(`http://localhost:5100/postchanel/${userid}` ,
            {
                method:"POST" ,
                headers:{
                    "Content-Type": "application/json"

                },
                body:JSON.stringify({
                    chanelid: Math.floor(Math.random() * 100) + 1 ,
                    chname:chanelname,
                    owner:owner,
                    description:chaelhandle,
                    chanelbanner:baner,
                    subscriber:"0"

                })
            }
            
        )
                // If the channel creation is successful

        if (response.ok){
          setnew(false)
            console.log("chnale is created")
            localStorage.setItem("second" , JSON.stringify("secondold"))
            toast("channel created  go to channel pages")
            // alert("channel created")
            navi("/")
        }
        

    }
      // JSX for rendering the component
    return (
        <>
  

            {/* Conditional rendering to show or hide the modal */}


{canc &&<div className="App">
      {/* Main content of the page */}
      <header className="App-header">
        <h1>Welcome to Your Page</h1>
        <p>Explore, create, and manage your channels.</p>
        <button className="create-channel-button">
          Create Channel
        </button>
      </header>

                         {/* Modal for creating a channel */}

    
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Channel</h2>
            <form onSubmit={handle}>
              <label>
                Channel Name:
                <input type="text" className="form-control" placeholder="Enter channel name"  onChange={(e)=>setchanelname(e.target.value)} />
              </label>
              <br />
              <label>
                Image URL:
                <input type="text" className="form-control" placeholder="Enter channel name"  onChange={(e)=>setbaner(e.target.value)} />
              </label>
              <br />
              <label>
                Description:
                <textarea placeholder="Enter channel description" className="form-control" onChange={(e)=>sethandle(e.target.value)}></textarea>
              </label>
              <br />
              <button className="btn btn-success" type="submit">Create</button>
              <Link to={"/"}><button type="button" className="btn btn-danger" onClick={closepage} >
                Cancel the Page
              </button></Link>
            </form>
          </div>
        </div>
      
    </div>}

        </>
    )
}
// Exporting the component for use in other parts of the application

export default Chanelpage