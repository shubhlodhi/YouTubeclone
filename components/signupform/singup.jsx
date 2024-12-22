import "./signup.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
function Signupform(){
    const [username   ,setusername] = useState("")
    const [email  ,setemail] = useState("")
    const [passcode   ,setpasscode] = useState("")
    const [avatar   ,setavatar] = useState("")
    // const [idss , setid] = useState("")
const navi = useNavigate()
console.log(username , avatar , email , passcode)

// console.log(randomString); // Output: Random number as a string

    async function handle(e){ // Declaring an asynchronous function `handle` to handle form submission.
      if (!username || !email || !passcode || !avatar){
        alert("provide all fields")
        return
        // If any field is missing, display an alert asking the user to fill all fields.
          // Prevent further execution if any field is missing.
      }
     
// console.log(randomString); // Output: Random number as a string


        e.preventDefault()
         // Sending a POST request to the server with the form data.
         // HTTP method is POST as we're submitting data to the server.
        // Preventing the default form submission behavior to handle it manually.
        
        const response = await fetch("http://localhost:5100/postusers" ,  {
            method:"POST",
            headers:{
                "Content-type":"application/json"
                // Indicating the data format is JSON.
            },
            body:JSON.stringify({ // Converting the form data into a JSON object and sending it in the request body.
                channel_id: Math.floor(Math.random() * 100) + 1,
                username:username,
                email:email,
                passcode:passcode,
                avatar:avatar
            })
        })
        const data = await response.json()  // Parsing the JSON response from the server.
        if(response.ok){  // If the server response is successful (status code 200-299).
            console.log("ghhj" ,data)
            navi("/loginform") // Navigating to the login page ("/loginform") upon successful signup.


        }

    }
    return(
        <>
         

<section class="vh-100" className="formborder" >
  <div class="container h-100" className="contrainer">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4" className="form" onSubmit={handle}>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0">
    <input required type="text" id="form3Example1c" class="form-control" onChange={(e)=>setusername(e.target.value)} />
    <label class="form-label" for="form3Example1c">Your UserName</label>
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0">
    <input required type="email" id="form3Example3c" class="form-control" onChange={(e)=>setemail(e.target.value)}  />
    <label class="form-label" for="form3Example3c">Your Email</label>
    {/* <input type="text" onChange={(e)=>setid(e.target.value)} /> */}
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0">
    <input required type="password" id="form3Example4c" class="form-control" onChange={(e)=>setpasscode(e.target.value)} />
    <label class="form-label" for="form3Example4c">Password</label>
  </div>
</div>

<div class="d-flex flex-row align-items-center mb-4">
  <i class="fas fa-key fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init class="form-outline flex-fill mb-0">
    <input required type="text" id="form3Example4cd" class="form-control" onChange={(e)=>setavatar(e.target.value)}  />
    <label class="form-label" for="form3Example4cd">Avatar</label>
  </div>
</div>


<div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
  <button className="btn btn-success" type="submit" >Register</button>
</div>

</form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" */}
                  {/* class="img-fluid" alt="Sample image"> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
    )
}
export default Signupform