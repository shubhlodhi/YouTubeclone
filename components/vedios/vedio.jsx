import { useEffect, useState } from "react"

function Vediodata(){
    const [get , setget] = useState([])
    // async function fetchvedio(){
        useEffect(async ()=> {
            const res = await fetch("http://localhost:5100/getvedio")
            const data = await res.json()
            setget(data)
        }, [])
        console.log(get)  
        
        
        
        


    return (
    <>
    {get.map(data=>
    <>
    <div className="singlepage">
         <iframe width="1237" height="696" 
        src={data.url} 
        title="Create YouTube Clone Using React JS | Build Complete Website Like YouTube In React JS 2024"
         frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen></iframe>       
          <h3>{data.title}</h3>
          <div className="likesection">
            <div className="thumbni">
          <img src="images/thumbnail6.png" alt="" />

          <p>channel name

            1.08M subscriber
          </p>
          <div className="joins">
          <button className="btn btn-primary">Join</button>
          <button className="btn btn-primary">Subscribe</button>
          </div>
          </div>
          <div className="thumbright">
            <div className="likes">{data.likes}<img src="images/like.png" alt="" ></img>
            |{data.dislikes}<img src="images/dislike.png" alt="" /></div>
            <img src="images/download.png" alt="" />
            <img src="images/share.png" alt="" />
          </div>
          
          </div>
        </div>
        <div className="desc">
            <p>
            150K views  9 months ago  #GreatStack #reactjs #webdevelopment
            {data.description}
            </p>
            <p>
Learn How to crate YouTube clone using React JS and YouTube Data API. Build website like YouTube with React JS. React JS project for beginners.
</p>

👉 Live Preview: https://vidtube-sable.vercel.app/ …More
            

        </div>
        </>
    )}


    </>
)
}
export default Vediodata