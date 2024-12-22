import 'bootstrap/dist/css/bootstrap.min.css';
 // Importing Bootstrap's CSS to style the form components
import "./login.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { useState  }from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'; // Importing `useContext` hook to access context values
import { newusercontext } from '../form/contextform';
// Importing `newusercontext` from the context for managing user status
import { ToastContainer, toast } from 'react-toastify';
// Importing Toastify's CSS to style the toast notifications
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function Loginform(){
      // Defining state variables to store username, password, and response from the server

    const [uername , setusername] = useState("")
    const [passcode , setpasscode] = useState("")
    const navi = useNavigate()
    const {setnew} = useContext(newusercontext)
    const ko = useContext(newusercontext)

    const [responsew , setres] = useState("")
    console.log(responsew)
    //  if (!uername || !passcode ){
    //     handlesuccess("please provide ")
    //  }

    async function handle(e){
         // Check if username and password are provided, if not show an alert
      if (!uername || !passcode){
        alert("please fill the required fields")
        return
      }
        e.preventDefault()
          // Sending the login request to the backend
        const response = await fetch("http://localhost:5100/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:uername,  // Sending the username (email) entered by the user
                passcode:passcode
            })
        })
        const result = await response.json()
        const {message} = result
        console.log(result)
         // Handling error response from the server
        if (!result.success){
          toast("something is wrong right" )
          toast( message)
          return
        }
         // Checking if the response was successful
        if (!response.ok ) {
          toast(result.message || "Something went wrong");
          return;
      }
        // const {ispasscode ,findemial,userid ,success  ,name ,user} = result
        


                // If login is successful, update context and local storage

      
        if(response.ok){
          setnew(true)
          // console.log("git" ,fir)
         
          // console.log("jiji" ,valid)
           
            // setres(valid)
            // toast("login succesfuly")
            // Storing relevant user information in localStorage for later use (e.g., for authentication)

      
              localStorage.setItem("first" , JSON.stringify("old"))

            
            localStorage.setItem("user" ,result.name)
            // localStorage.setItem("token" ,valid)
            localStorage.setItem("name" ,result.user)
            localStorage.setItem("userid" , result.userId)
            localStorage.setItem("avatar" , result.avatar)
            

            

            
          //  setTimeout(() => {
            // Redirecting the user to the homepage and reloading the page

            navi("/")
            window.location.reload(); // Refreshing the page to reflect the updated login status

          //  }, 2000);
        }
       


    }
    console.log(responsew)
  

 

  // Update localStorage whenever `state` changes


    return(
        <>
        
  {/* </div> */}
   {/* Display Toast notifications */}
  <ToastContainer/>

  <form onSubmit={handle}>
    {/* Form submission is handled by the `handle` function */}

  <div data-mdb-input-init class="form-outline mb-4">
    <input  required type="email" id="form2Example1" class="form-control" onChange={(e)=>setusername(e.target.value)}/>
    <label class="form-label" for="form2Example1">Email address</label>
  </div>


  <div data-mdb-input-init class="form-outline mb-4">
    <input required type="password" id="form2Example2" class="form-control" onChange={(e)=>setpasscode(e.target.value)} />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

 
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
   
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
    
      <a href="#!">Forgot password?</a>
    </div>
  </div>

 
  <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>


  <div class="text-center">
 {/* <button className='btn btn-danger'>signup</button> */}
    <p>Not a member? <Link to={"/signupform"}><a href="#!">Register</a></Link> </p>
    
    <p>or sign up with:</p>
    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>

        </>
    )
}
export default Loginform