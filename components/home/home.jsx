import Category from "../category_filter/filter"
import Desktop from "../feed/feed"
import Header from "../header"
import { useState } from "react"
import "./home.css"
// function is to get the navbar and sidebar and also category page 
// which is show on every page i navigate 

function Home({counts}){
  
  
    
    return(
        <>
        {/* pass the componenets of category and desktop   */}
        {/* as a sharing component usnig prop drilling */}
     
       <Category ismini={counts}/>
       
       <Desktop Ismini={counts}/>
     

        </>
    )
}
export default Home