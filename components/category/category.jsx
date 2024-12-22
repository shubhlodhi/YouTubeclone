import { useEffect, useState } from "react"
import { useContext } from "react"
import { usercontext } from "../form/contextform"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./category.css"
//  category page to define the data sorted by category of vedios
function Categorypage({value}){

    const[datag , setdata] = useState([])
    // take data from the url parameter
    const url = useParams()
    // console.log("vcatego" ,url.id)
//   use useffect to fetch the vedios data and atore it on the datag usestate hook
    useEffect(async ()=>{
        const resposne = await fetch("http://localhost:5100/getvedio")
        const data = await resposne.json()
        setdata(data)
    } , [])
    // then filter the data accroding to the category of vedio data

    const datass = datag.filter(data=>data.category.includes(url.id))
    // console.log("data" , data)


    return(
        <>
        {!datass ? <h1>no vedio found</h1> :
            <div className={value ? "feed" : "feed2"}>
        {/* using map function to define the data in a html forms and on frontend */}
        {datass.map(data=>

        <div className="cards"> 
           <div className="gungro" key={data._id}>
             <Link to={`/vedioplayer/${data._id}`} className="die">
                <iframe src={`https://www.youtube.com/embed/${data.url}`} frameborder="0"></iframe>
                <h2>{data.title}</h2>
                <h3>{data.uploader}</h3>
                <p>{data.views} • 2 days ago</p>

                </Link>
            
            </div>
            </div>
       
        )}
       </div> 

        
    }
        </>
    )
}
export default Categorypage