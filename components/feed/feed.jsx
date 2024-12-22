// import Singlepage from "../singlepage/singelpage"
import { useState ,useEffect } from "react"
import "./feed.css"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import ji from "../../images/cameron.png"
import timeAgo from "../utils/daytime"
import formatNumber from "../utils/formatnumber"
function Desktop({Ismini}){
    const [get   , setget] = useState([]) // Declaring state variables: `get` to store video data
    const [data , setcard] = useState([])
    // Declaring state variable `data` to store card data (not used in this code)

    const [chanledata , setchaneladta] = useState([])
     // Declaring state variable `chanledata` to store channel data
    useEffect(async ()=> {
        const res = await fetch("http://localhost:5100/getvedio")
        const data = await res.json() // Parsing the response as JSON
        setget(data)
        
    }, [])
    // Getting the `userid` and "channelid" from localStorage (for channel/user data)
    const userid = localStorage.getItem("userid")
    const chanelid = localStorage.getItem("chanelid")
   { chanelid && useEffect(()=>{
        async function getchanleinfo(){
            const datass = await fetch(`http://localhost:5100/getchanel/${userid}/${chanelid}`)
            const result = await datass.json()
            console.log("chanle" , result.data)
setchaneladta(result.data)

        }
        
        getchanleinfo() // Calling the function to fetch channel info
    } , [])} // The empty dependency array means this effect runs only once when the component mounts or when `chanelid` changes
   
    const avatar = localStorage.getItem("avatar")


    return(
        <>
        <div className={Ismini ? "feed" : "feed2"}>
            {/* Conditionally applying CSS class based on `Ismini` prop */}
        
        {get.map(data=>

        <div className="cards"> 
           <div className="" key={data._id}>
             <Link to={`/vedioplayer/${data._id}`}  className="styleslink">
                {/* <iframe src={data.url} frameborder="0"></iframe> */}
                <iframe src={`https://www.youtube.com/embed/${data.url}`} ></iframe>
<div className="fly">
                <div className="newimg">  
                    <img src={data.chanleimage} alt="" />
                </div>
                    <div className="newcr">
                <h2>{data.title.slice(0,30)}</h2>
                <h3>{data.uploader}</h3>
                <p>{formatNumber(data.views)} views • {timeAgo(data.uploadedDate)}</p>
                </div>
                </div>
              
                
                {/* <button className="btn btn-success">Add on playlist</button> */}

                </Link>

            
            </div>
            </div>
       
        )}
       </div> 
       
    

        
        
       

        </>
    )
}
export default Desktop