import { useEffect, useState } from "react"
// import Link from "react-router-dom"
import { Link } from 'react-router-dom';

// import Link
import "./filter.css"
function Category({ismini}){
    // store the data of category of vedios and show it on the header page
    const [datass , setdata] = useState([])
    
    // useffect to fetch the vedios data and store it on the use state hook
    useEffect(async ()=>{
        const resposne = await fetch("http://localhost:5100/getvedio")
        const data = await resposne.json()
        setdata(data)}
     ,[])
    //  create array of categories
     const categories = ["music" , "singing" ,"vlogs" , "Tech" , "History" , "Knowledge" , "comedy" , "Entertainment" , "Techonology" , "Funny" , "Podcast" ,"Sports" , "Industries" , "Mountain"  ,"Beaches" , "VAcation"]

    return(
        <>
        {/* define condition to apply classes css if the sidebar are open or close */}
        <div className={ ismini ? "category" : "categorylarge"}>
       
          
            {categories.map(data=>
                <>
                <div className="catego" key={data._id}>
                <Link to={`/categorypage/${data}`} className="link"><p>{data}</p></Link>
                </div>
                </>
            )}
          

        </div>

        </>
    )
}
export default Category