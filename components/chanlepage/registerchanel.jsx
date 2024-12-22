import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import imag from "../../images/thumbnail2.png"
import { Dropdown, DropdownButton } from "react-bootstrap"
import "./register.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { addvedioinchanel } from "../../nodejs/controller/userfet"
import verifi from "../../images/verified.png"
import bulet from "../../images/bullet.png"
import formatNumber from "../utils/formatnumber"
import timeAgo from "../utils/daytime"
// import {ToastContainer , toast} from "react-bootstrap"
// import
import { ToastContainer , toast } from "react-toastify"
function Registerchanle({ismini}){
    // Functional component for managing channel registration and displaying videos.

  const [selectedcategory ,setselectedcategory] = useState("")
    // State to store the currently selected video category.

  const [newdot , setchid ] =useState()
    // State to store the channel name.


  const [viid , setviid  ] = useState([])
    // State to store a list of videos retrieved from the server.

    const [adtas  ,setdatas] = useState([])
      // State to store user data fetched from the server.

    const [op , setop] = useState([])

    const [htpurl , sethtp] = useState("")
      // State to store the video URL entered by the user.


    const [title , settile] = useState("")
    const[desc,setdesc] = useState("")
    const [subs ,setsub] = useState(true)
    const [page , setpage] = useState(false)
    const [catego ,setcat] = useState("")
      // State to store the selected category for the new video.

    const [showfull ,setshowfull] = useState(false)
    const [baner , setbaner] = useState("")
      // Retrieve the logged-in user's ID from localStorage.

    const url = localStorage.getItem("userid")
      // Retrieve the logged-in user's name from localStorage.

    const name = localStorage.getItem("name")
    const pathurl = useParams()
    const navi = useNavigate()
    console.log("chanekl" , pathurl)
      // Debugging: Log the URL parameters.

    localStorage.setItem("chanelid"  , pathurl.id)
    console.log(url)
    useEffect(async()=>{
          // Fetch all videos from the server when the component mounts.

      const responss = await fetch("http://localhost:5100/getvedio")
      const data  = await responss.json()
      if(data){
        setviid(data)
              // Store the video data in the state.

      }
      

    } ,[])

    useEffect(async ()=>{
          // Fetch user data when the component mounts.

        const response  = await fetch(`http://localhost:5100/getusers/${url}`)
        const data = await response.json()
        if (data){
          setdatas(data)
          // console.log("data with effect " , data)
        }
       

    } ,[])
    useEffect(async ()=>{
          // Fetch videos specific to the current channel when the component mounts.

const respose = await fetch(`http://localhost:5100/getvediobychanelid/${url}/${pathurl.id}`)
const datass = await respose.json()
if(datass){
  setop(datass)
  console.log("useeftc" , datass.subscriber , datass.chanelbanner)
  localStorage.setItem("subscriber" , JSON.stringify(datass.subscriber))
  localStorage.setItem("chanelbaner" , JSON.stringify(datass.chanelbanner))
  
}

    } ,[])
      // Use filter and map to get the matching video data
//   const filteredVideos = addvedio.map(id =>
    // videos.find(video => video.id === id)
    const addvid = op.addvedio
    let b = 0
    let a = 0
    if (!viid){
      console.log("no vedio found")
    }
    else{
      b = (viid.length)
    }
    if (!addvid){
      console.log("no vedio found")
    }
    else{
      a = (addvid.length)
    }
    console.log(a)
    console.log(b)
    // console.log(addvid.length )
    // console.log(viid.length)
    const guu = viid.filter(data=>data._id=="675b10599e3761cd85e5c2be")
    console.log("guu" ,guu)
    // find the filter vedios using nested loop approach 
    const filteredvedio = []
    for (let i=0 ; i<a; i++){
      for (let j =0;j<b;j++){
       if (addvid[i] == viid[j]._id){
        console.log("sss" , viid[j]._id )

        filteredvedio.push(viid[j])
        break
       }
      }

    }
    console.log("filteres" , filteredvedio)
    console.log(addvid)
    // filter data form the new data of vedio by using object id 
    // by comparing the pathurl of an parameter
    const newdata = adtas.filter(data=>data._id == pathurl.id)
  //  check if the newdata is present then 
  // append the data on setchid and setbaner
    if (newdata.length > 0) {
      const newdet = newdata[0].chname;
      const newbaner = newdata[0].chanelbanner
      
      console.log("all i fream of" , newdet , newbaner);
      setchid(newdet)
      setbaner(newbaner)
      
      // Perform operations with newdet
  } else {
      console.error("No matching data found for the given pathurl.id");
  }
   
   
    

    

    // console.log("klkl" , newdata[0].chname)
   console.log("op" , op)

// function  to add the subscriber to the database
async function addsubs(e){
  e.preventDefault()
  setsub(!subs)
  const res = await fetch(`http://localhost:5100/addsubscriber/${url}/${pathurl.id}` ,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(res.ok){
    // navi(0)
  }
}

// to delete the vedio from the channel 
async function deletevedio(id){
  console.log("id of vedoi" , id)
  // e.preventDefault()
  const resul = await fetch(` http://localhost:5100/dletevedioinchanel/${url}/${pathurl.id}`,
{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    idss:id
  })

}
  )
  if (resul.ok){
    console.log(resul)
    navi(0)
  }
  
  
}
const category = ["music" , "singing" ,"vlogs" , "Tech" , "History" , "Knowledge" , "comedy" , "Entertainment" , "Techonology" , "Funny" , "Podcast"]

// console.log("hihihihh" , newdata[0].chanelbanner)
// function to add the vedio on the chanel using channel id and user id 
async function addvedio(){
  if (!title || !desc || !htpurl || !catego) {
    console.error("All fields are required!");
    alert("Please fill in  required field (Category)." , 
      
    );
  
    return;}
    const response = await fetch(`http://localhost:5100/addvedio/${url}/${pathurl.id}` ,
        {
            method:"POST",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify({
    title:title,
    description:desc,
    vedioid:Math.floor(Math.random() * 100) + 1,
    url:htpurl,
    views: Math.floor(100 + Math.random() * 900),
    likes:0,
    dislikes:0,
    uploader:newdot,
    chanelid:pathurl.id,
    category:catego,
    chanleimage:baner,



})        }
        
    )
    const results = await response.json()
    
    if (response.ok){
    
      console.log("resultss" , results )

      // if (!results.url || !results.category || !results.title || !results.description || !results.success){
        // toast("something is missing")
      // }
        // navi(`/registerchanel/${pathurl.id}`)
    }
    
    
}

// delete the channel  id from the channel 
// to delete the chanel from the database and also from the UI
async function dletechanle(id){
  if (!url || !id){
    alert("url is not defined")
    return
  }
  // e.preventDefault()
  const respno = await fetch(`http://localhost:5100/deletechanel/${url}` ,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      ids:id
    })
  })
  if (respno.ok){
    window.location.href = "/";
    navi("/")
    


  }
  let adta = await respno.json()
  if(!respno.ok){
    toast("not found" , adta.message)
    return
  }
  
}
function addpage(){
    setpage(!page)
}
function nsub(){
setsub(!subs)
}   
// console.log("catete" , catego)
// if(!selectedcategory){
  // toast("sleect the category")
// }
function showdesc(){
  setshowfull(!showfull)
}
 return (
        <>
        <ToastContainer/>
        {/* <h1>register</h1> */}
        {newdata.map(data=>
            <>
            <div className={ismini ?"chanlepage":"chanlepagelarge"}>
            <img className="img1" src={data.chanelbanner} alt="" />
            <hr />
            <div className="chaneldet">
                <img src={data.chanelbanner} alt="" />
                
                <div className="chname">
                <h2>{data.chname} <img src={verifi} alt="" /></h2>
                    <div className="smailldet">
                      
                        <p> @{data.chname}  <img src={bulet} alt="" />{formatNumber(data.subscriber)} subscriber <img src={bulet} alt="" /> {data.addvedio.length} videos</p>
                    </div>
                    <div className="description">
                       <p> {!showfull ?data.description.slice(0,30):data.description}  <a onClick={showdesc}>...More</a></p>
                    </div>
                    <div className="subscriber">
                      { subs &&  <button className="btn btn-danger" onClick={addsubs} >Subscribe</button>
}
                      { !subs &&  <button className="btn btn-danger" onClick={nsub}>Unsubscibe</button>
                     
}
<svg onClick={()=>dletechanle(data._id)} xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> 

                        
                        {/* {data.subscriber} */}
                    </div>
                    </div>
                    </div>
                    <hr />
            <div className="filter">
            <button type="button" class="btn btn-outline-light">Home</button>
               <button className="btn btn-outline-light"> <a href="">playlist</a></button>
                <button className="btn btn-outline-light"><a href="">vedios</a></button>
               <button className="btn btn-outline-light"> <a href="">playlists</a></button>
               <button className="btn btn-outline-light" onClick={addpage}>Add Vedio</button>
               {page? <>
                <header className="App-header">
        <h1>Welcome to Your Page</h1>
        <p>Explore, create, and manage your channels.</p>
        <button className="create-channel-button">
          Create Channel
        </button>
      </header>

      {/* Modal */}
    
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Channel</h2>
            <form onSubmit={addvedio}>
              <label>
                Title:
                <input required type="text"onChange={(e)=>settile(e.target.value)} className="form-control" placeholder="Enter channel name"   />
              </label>
              <br />
              <label>
                description:
                <input required type="text" className="form-control" onChange={(e)=>setdesc(e.target.value)} placeholder="Enter channel name"  />
              </label>
              <br />
              <label>
                URL:
                <input required type="text" placeholder="Enter channel description" onChange={(e)=>sethtp(e.target.value)} className="form-control" />
              </label>
              <br />
              <label>
                Category:
                {<DropdownButton title={selectedcategory || "select the category"} required>
                  {category.map((data ,index) =>(
                <Dropdown.Item key={index}>
                  <a required className="dropdown-item" 
                   href="#" onClick={(e)=>{
                    e.preventDefault()
                   setcat(data)}}>{data}</a>
                
               
                 </Dropdown.Item>
                  )
              )}
              
                </DropdownButton>}
                {/* <input type="text" onChange={(e)=>setcat(data)} /> */}
              </label>
              <br />
              <button className="btn btn-success" type="submit">Create</button>
              <Link to={`/registerchanel/${pathurl.id}`}><button  onClick={addpage} type="button" className="btn btn-danger"  >
                Cancel the Page
              </button></Link>
            </form>
          </div>
        </div>
      
    {/* </div> */}
               </> :""}

                <hr />
                <div className="vedios">
                {filteredvedio.map(data=>

                <div className="cards" key={data._id}>
           <div className="" key={data._id}>
             <Link to={`/vedioplayer/${data._id}`} className="chvid">
                <iframe src={`https://www.youtube.com/embed/${data.url}`} frameborder="0"></iframe>
                <h2>{data.title}</h2>
                <h3>{data.uploader}</h3>
                <p>{formatNumber(data.views)} views • {timeAgo(data.uploadedDate)} </p>
                

                </Link>
                <svg onClick={()=>deletevedio(data._id)} xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> 
                {/* <button className="btn btn-danger" onClick={()=>deletevedio(data._id)}>Delete</button> */}

                </div>
                
                </div>
                
                
                
              )}     
                    
                </div>
               
            </div>
                

            

            
          
            
            </div>
            </>
        )}


        </>
    )
}
export default Registerchanle