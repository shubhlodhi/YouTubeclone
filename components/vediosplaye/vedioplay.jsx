import Vedioplayer from "./vediosplayer"
import Recomended from "./recomended"
import "./playveio.css"
function Vediopl({counts}){

    return(
        <>
        {/* define two components in one component pass data as prop drilling */}
        <div className="play-container">
            <Vedioplayer value={counts}/>
            <Recomended/>
        </div>

        </>
    )
}
export default Vediopl