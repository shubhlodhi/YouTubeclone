import { useEffect, useState } from "react"
import { useContext } from "react"
import { usercontext } from "../form/contextform"
import { Link } from "react-router-dom"
import "./search.css"
// to={{ 
//     pathname: "/search", 
//     state: { searchQuery: searchInput } // Pass state
//   }}
// >


// function Search() {
//   const location = useLocation();
//   const { searchQuery } = location.state || {}; // Access passed state
//   console.log(searchQuery); 
function Search({value}){  // Search component that accepts a prop `value` to conditionally render content
    const gu = useContext(usercontext)  // Accessing the `usercontext` to get the current user's state data
    const [dataa , setdata] = useState([])  // Declaring a state variable `dataa` to hold video data fetched from the server
    
        useEffect(()=>{ // Using useEffect to fetch data once when the component mounts
        async function fet() {
            
        
        const resposne = await fetch("http://localhost:5100/getvedio")
         // Sending a GET request to fetch video data from the server
        const data = await resposne.json()
        setdata(data)}
        fet() // Calling the fetch function
    } ,[])
    
    
        const findata = dataa.filter(data => data.title.toLowerCase().includes(gu.update.toLowerCase()))
                console.log("findata" , findata)
    // Filtering videos based on the search query (from `gu.update`) by checking if the video title includes the query (case-insensitive)
    console.log("findata", findata);  // Logging the filtered results for debugging
    
    // console.log("datra" , dataa)
   
  

   console.log(gu)
    
    // console.log("valuev ", value)
    return(
    <>
      <div className={value ? "feed" : "feed2"}>
        
        {findata.map(data=>

        <div className="cards"> 
           <div className="iwanna" key={data._id}>
             <Link to={`/vedioplayer/${data._id}`} className="with">
                <iframe src={`https://www.youtube.com/embed/${data.url}`} frameborder="0"></iframe>
                <h2>{data.title}</h2>
                <h3>{data.uploader}</h3>
                <p>{data.views} • 2 days ago</p>

                </Link>
            
            </div>
            </div>
       
        )}
       </div> 
    {/* <h1>{value}</h1> */}
    {/* <h1>helo</h1> */}

    </>
    )
}
export default Search