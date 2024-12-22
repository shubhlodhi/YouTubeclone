import { useEffect ,useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Usercomnnet from "./vediocomment"
import "./playveio.css"
import MyImage from '../../images/banner.png';
import dislike from "../../images/dislike.png"
import like from "../../images/like.png"
import share from "../../images/share.png"
import save from "../../images/save.png"
import simon from "../../images/simon.png"
import timeAgo from "../utils/daytime" 
// Importing utility to format time (e.g., "5 minutes ago").

import formatNumber from "../utils/formatnumber"
// Define the main functional component for video player.

function Vedioplayer({value}){
    const [datas ,setdata] = useState([]) // State to store video data.
    const [fet , setfet] = useState()
    // State to store user details fetched from the API.
    // State to manage subscription status (true/false)
    const [sub , setsub] = useState(Boolean)
    const [likess , setlikes] = useState()
    // State to store like details.
    const [lik , setlikesss] = useState()
    const [subsdetails , setsubdetails] = useState()
    // State to toggle description visibility.
    const [showdesc ,setdesc] = useState(true)

    const id = useParams()
    // Getting video ID from URL parameters using useParams().
    const navi = useNavigate()
    const userid = localStorage.getItem("userid") // Retrieving user ID from local storage.
    const chanelid = localStorage.getItem("chanelid") // Retrieving channel ID from local storage.
    // useEffect hook to fetch user data when the component mounts.

    useEffect( async()=>{
      const res = await fetch(`http://localhost:5100/getuser/${userid}`)
      const data = await res.json()
      setfet(data)






    } ,[])
        // useEffect hook to fetch subscription data when the component mounts.

    useEffect(()=>{
      const subsciberdetail = localStorage.getItem("subscriber")
      setsubdetails(subsciberdetail)
      

    } ,[])
    console.log("subdetails"  , subsdetails)
 
    console.log("if" , fet)
    if(likess){
      setlikesss(likess.likes)
    console.log("like" , lik)
    }
    // console.log("sss" , datas)

    // console.log(id.id)
  // useEffect hook to fetch video data when the component mounts.

    useEffect(async()=>{
        const response = await fetch("http://localhost:5100/getvedio")
        const data = await response.json()
        setdata(data)


    } ,[])
     // Finding the video by ID in the list of video data.
    const likei = datas.find(data=>data._id==id.id)

    setlikes(likei)
    // / Updating the `likess` state with the found video data.
    console.log("hkjhk" , likei)
    // Debugging video data in the console.
    
    const finddata = datas.filter(data=>data._id  == id.id)
    // Filtering out the specific video using the video ID.
   
      // console.log("sss" , finddata[0].likes)
      // setlikes( finddata)

    
    

    
   
    // console.log("find " , finddata)
   
     async function likebuton(e){
      e.preventDefault() // Preventing default form submission behavior.
      const ress = await fetch(`http://localhost:5100/like/${id.id}` ,{
        method:"POST",  // Using POST method to like the video.
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(ress.ok){

        console.log("like os suces")
        // setlikesss()
        // navi(0)
      }
    

    }
    async function disliekbuton(e){
      e.preventDefault() 
      // Preventing default form submission behavior.
      const dislikee = await fetch(`http://localhost:5100/dislike/${id.id} ` ,
        {
          method:"POST",
          // Using POST method to dislike the video.
          headers:{
            "Content-Type":"application/json"
          }
        }
      )
      if(dislikee.ok){
        navi(0)
        // Navigating to the same page to refresh data after dislike.

      }
    }
      // Function to toggle the subscription status (Subscribe/Unsubscribe).

function setsubsciber(){
  
  setsub(!sub)
  // localStorage.setItem("subs" , sub)
  

}
// const subsactive = localStorage.getItem("subs")
    // Function to toggle the description visibility.

function descstate(){
  setdesc(!showdesc)
}
   
    return(
        finddata.map(data=>

        
        <>
        
        
        <div className={ !value ? "play-vedio" : "playvediomini"}>
          <iframe src={`https://www.youtube.com/embed/${data.url}`} frameborder="0"></iframe>
          <h3>{data.title}</h3>
          <div className="play-video-info">
            <p>{formatNumber(data.views)} views &bull; {timeAgo(data.uploadedDate)}</p>
            <div>
              <span><img src={like} alt="like" onClick={likebuton} />{lik}</span>
              <span><img src={dislike} alt="dislike" onClick={disliekbuton}/>{data.dislikes}</span>

              <span><img src={share} alt="share" /></span>

              <span><img src={save} alt="save" /></span>



            </div>
          </div>
          <hr />
          <div className="publisher">
            <img src={simon} alt="uploader" />
            <div>
              <p>{data.uploader}</p>
              {/* <span>{subsdetails} subscriber</span> */}
            </div>
            { !sub &&<button onClick={setsubsciber}>Subscribe</button>
}
    {sub &&        <button onClick={setsubsciber}>UnSubscribed</button>
}
          </div>
          <div className="vid-desc">
            {showdesc ? data.description.slice(0,89) : data.description}  <a  onClick={descstate}>more...</a>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo odio quibusdam quisquam incidunt? Quo reiciendis delectus tenetur repudiandae enim obcaecati veritatis similique corrupti assumenda, vel dolorum aut consequuntur eos dolor?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium libero pariatur et nam quaerat praesentium repellat maiores itaque quos sit eos molestias error soluta voluptates quo dignissimos, aliquid obcaecati illum.</p>
          <h4>130 coments</h4>
          
 <Usercomnnet comment={data.commentsection} vedioid={id.id}/> 


          </div>


        </div>

       

        </>
        )
            
 
           
        
       
        

        
    )
}
export default Vedioplayer