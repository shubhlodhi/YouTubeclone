import axios from "axios"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { usercontext } from "./contextform";
import { useNavigate } from "react-router-dom";
// import Header from "../header";
import "./form.css"


function Form(){
        // Declaring state variables to store user input data

    const [datas  , setdata] = useState("") // State for storing user's name
    const [age  ,setage] = useState("")  // State for storing user's age
    const [hobby , sethobby] = useState("") // State for storing user's hobby
    const gu = useContext(usercontext)
    const navi = useNavigate() // Getting the navigate function for routing

    
    
   
    
    
    
    
    async function  handle(e) {
        setinfo(!gu.update)  // This toggles the `update` value from the user context (but `setinfo` is undefined)
        navi("/")  // Navigating to the root route ("/") after form submission
        
        e.preventDefault() // Preventing the default form submission behavior
 // Sending a POST request to the server with the user input data
        const response  = await fetch("http://localhost:5100/postuser" ,{ 
            method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
    body:JSON.stringify({
        name:datas,
        age:age,
        hobby:hobby
    })}
        )
                // Logging the response from the server and the value (though the value is undefined)


    console.log(response)   
    console.log(value)
    // console.log("ipipi" ,gu.update)
    
        
        
        
        
    }


    return(
        <>
        {/* <Header/> */}
        <div className="forms">
<h1>from</h1>
<form action="" onSubmit={handle}> {/* On form submission, the `handle` function is called */}
{/* Label and input for the name */}
    {/* <h1>{gu}</h1> */}
<label htmlFor="name">Name</label>
<input className="form-control" type="text"
name="name" onChange={(e)=> setdata(e.target.value)} placeholder="name" />
<label htmlFor="name">Age</label>
<input className="form-control" type="text" name="age" placeholder="age" onChange={(e)=>setage(e.target.value)} /> 
<label htmlFor="name">Hobby</label>
<input className="form-control"  type="text" name="hobby" placeholder="hobby"  onChange={(e)=>sethobby(e.target.value)}/>

<button type="submit">button</button> 
</form>
</div>
        </>
    )
}
export default Form