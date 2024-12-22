import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./playveio.css"
// Declaring the `Editcment` component 
// which takes `value` as a prop (likely the comment ID).
function Editcment({value}){
    const [iset , setedits] = useState()
    const url = useParams()
    // Using `useParams` to get the URL parameters (specifically the `id` from the URL).
    const navi = useNavigate()
    console.log("newmm" , url.id)
    // Logging the `value` prop passed to the component (likely the comment ID).
    console.log("cosm" , value)
    async function handle(e){  // Declaring an asynchronous function `handle` to submit the edited comment.
        e.preventDefault() // Preventing the default form submission behavior to handle it manually.
        // Sending a POST request to update the comment
        const response = await fetch(`http://localhost:5100/editcoment/${url.id}` ,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                comid:value,
                text:iset
                // Sending the `value` (likely the comment ID) to identify which comment to update.
                 // Sending the new comment text stored in `iset`.
                
            })
        })
        // If the response is OK (successful), navigate back to the previous page
        if (response.ok){
            console.log(response)
            navi(0)
        }


    }
    return (
        <>
        <div className="comentedit">
            <input type="text" className="form-control"
            onChange={(e)=>setedits(e.target.value)}/> 
            <button className="btn btn-primary" onClick={handle}>submit</button>
        </div>

        </>
    )
}
export default Editcment