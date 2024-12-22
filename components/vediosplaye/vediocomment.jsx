import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Editcment from "./editcomii"
import "./playveio.css"
import image from "../../images/thumbnail3.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import like from "../../images/like.png"
import dislike from "../../images/dislike.png"
import formatNumber from "../utils/formatnumber"
import timeAgo from "../utils/daytime"
 // Declaring the `Usercomnnet` component that takes `comment` and `vedioid` as props.
 // Extracting the `id` parameter from the URL using `useParams` (used to identify the video or comment).
  // Managing the input data for a new comment with state `data`.
  // Managing whether a comment is being edited or not (`true`/`false`).
  // State for storing edited comment data (currently not used directly in the component).
  // Initializing state `comnents` to hold the list of comments passed as a prop.

 // Getting the current user's name from local storage.
   // Getting the current user's avatar from local storage.
function Usercomnnet({comment , vedioid}){
    const url = useParams()
    // console.log("ss" , url.id)
    const navi = useNavigate()  // Initializing `useNavigate` to navigate programmatically after certain actions (like adding or deleting a comment).

    const [data , setdata  ] = useState("")
    const [isedit ,setedit] = useState(false)
    const [edits ,setedits] = useState()
    // const [newstate , setstate] = useState(true)
    const [comnents , setcomments] = useState(comment)
const user = localStorage.getItem("name")
const avatar = localStorage.getItem("avatar")
    // const[comid ,setcomid] = useState()
    // console.log(comment )
    // debug the code



    
    async function addcom(e){
        // Function to handle adding a new comment.
        e.preventDefault()
        // Preventing the default form submission behavior.
        const response = await fetch(`http://localhost:5100/postcoment/${url.id}` ,{
             // Sending a POST request to add the new comment to the database.
            method:"POST" ,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                text:data
            })
        }) 
         if(response.ok){
            const data = await response.json()
            // setcomments(...comnents , data)
            setcomments(prevComments => [...prevComments, data]); // Add to local state


            console.log("respomse"  , response)
            toast("Wow so easy!");// Displaying a success toast notification using `react-toastify`.
            // setstate(!newstate)
            setdata(" ")  // Clearing the input field after the comment is added.
            navi(0) // Navigating to the same page to refresh the list of comments (triggers a re-render).
        
         }
         if (!response.ok){
             // If the response is not successful, no additional actions are taken.
        // Handle error case (currently empty).
            
         }
       





    }
    console.log("ljk" , comnents)
    async function edit(e){
        e.preventDefault()
        setedit(!isedit)
        // setcomid(id)

        

    }
    // async function editcom(e){
    //     e.preventDefault()
    // }
    async function del(idss){
        // e.preventDefault()
        const responses = await fetch(`http://localhost:5100/delcoment/${url.id}` ,
            {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    comid:idss
                })
            }
        )
        // const dt   = await responses.json() 
        
        if (responses.ok){
            navi(0)

            console.log("delte" ,responses)


        }

    }
   async function getlikess(id){
    // e.preventDefault()
    const responses = await fetch(`http://localhost:5100/dislikecoment/${vedioid}` ,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            comid:id
        })
    })
    if(responses.ok){
        navi(0)

    }
    
    }
    async function getdislikess(id){
        // e.preventDefault()
        const responses = await fetch(`http://localhost:5100/likecoment/${vedioid}` ,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                comid:id
            })
        })
        if(responses.ok){
            navi(0)
    
        }
        
        }
    
console.log("vedioid" , vedioid)

   
    return(
        <>
        <ToastContainer/>
       
        <h1>130 comment</h1>
        <div className="addcoment">
        <img src={avatar}  alt="" />
        <input type="text " className="form-control" value={data} onChange={(e)=>setdata(e.target.value)} />
        </div>
        <button className="btn btn-outline-success" onClick={addcom}>addcoment</button>
       
        {comnents.map(data=>
            <>
            <div className="comment" key={data._id}>
                {/* <form action=""> */}
                <img src={avatar} alt="gg" />
                <div>
                    <h3>{user} <span>{timeAgo(data.timeStamp)}</span></h3>
                    <p>{data.text}content user comented Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque praesentium consequatur eaque veritatis natus expedita excepturi veniam rem commodi labore illo dicta asperiores quas, cumque accusamus quo! Laborum, labore ducimus?</p>
                    <div className="commentaction">
                        <img src={like} onClick={()=>getdislikess(data._id)} alt="like" />
                        <span>{formatNumber(data.likes)}</span>
                        <img src={dislike} onClick={()=>getlikess(data._id)} alt="dislike" />
                        <span>{formatNumber(data.dislikes)}</span>
                        <div className="but">
                        <button className="btn btn-success" onClick={edit}>Edit</button>
            {isedit ? <Editcment value={data._id}/> : ""}
            <button className="btn btn-danger" onClick={()=>del(data._id)}>Delete</button>
            </div>


                    </div>
                </div>

            {/* {data.text} */}
            
           
            {/* </form> */}
            </div>
            </>
        )}


        </>
    )
}
export default Usercomnnet