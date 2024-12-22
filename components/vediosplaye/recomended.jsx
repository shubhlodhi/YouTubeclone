import "./playveio.css" // Importing the custom CSS file to apply styles specific to the `Recomended` component.
import thumb from "../../images/thumbnail3.png"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import formatNumber from "../utils/formatnumber"
 // Importing a utility function `formatNumber` to format the view count (likely to include commas or other formatting).
import timeAgo from "../utils/daytime"
  // Importing a utility function `timeAgo` to format the upload time into a "time ago" format (e.g., "2 days ago").

function Recomended() {
    // Declaring the `Recomended` component, which will display a list of recommended videos.
    const [vediodata, setdata] = useState([])
 // Updating the `vediodata` state with the fetched video data.
 // `useEffect` runs when the component is mounted, initiating the fetch request.

    useEffect(async () => {
        const response = await fetch("http://localhost:5100/getvedio")
        const data = await response.json() // Parsing the response to JSON format, which should contain the list of video data.
        setdata(data)
        // console.log("new data" , data)
        // console.log("new data" , data)
    })  // `useEffect` runs when the component is mounted, initiating the fetch request.
    return (
        <>

            <div className="recomended">
                {vediodata.map(data =>
                    <Link to={`/vedioplayer/${data._id}`} className="link"><div className="side-vedio-list">

                        {/* <img src={thumb} alt="thumbn1" /> */}
                        <iframe src={`https://www.youtube.com/embed/${data.url}`} frameborder="0"></iframe>
                        <div className="vid-info">
                            <h4>{data.title}</h4>
                            <p>{data.uploader}</p>
                            <p>{formatNumber(data.views)} views • {timeAgo(data.uploaded)}</p>
                        </div>

                    </div>
                    </Link>

                )
                }


            </div>


        </>
    )
}
export default Recomended