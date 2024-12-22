// Importing the required functions from the controller (userfet.js) for handling different routes

import { postnewuser ,   postvedio, postcoment, getvedio, signupuser, loginuser, loginvalidation, editcoment, deletecomment, getuser, postchanel, getusers, addvedioinchanel, getvedionychanelid, addsubscriber, addonplaylist, like, dislike, deletevedioinchanel, likecoment, dislikecoments,  deletechanel, getchanel } from "../controller/userfet.js";

// import { signupvalidaion } from "../middleware/validation_form.js";
// import multer from "multer"

// const storage = multer.memoryStorage()
// const upload = multer({storage})
// Importing additional middleware or packages like validation and multer (commented out)
// import { signupvalidaion } from "../middleware/validation_form.js";
// import multer from "multer"

// Setting up multer for file upload (currently commented out)
// const storage = multer.memoryStorage()
// const upload = multer({storage})

// Function to define all the routes and their corresponding HTTP methods and controllers

function routes(app){
        // Route for creating a new user by posting user data (via POST)

    app.post("/postuser" , postnewuser)
        // Route for posting a new video (via POST)

  
    app.post("/postvedio" , postvedio)
        // Route for posting a new video (via POST)

    app.post("/postcoment/:id" ,postcoment )
        // Route for fetching the list of videos (via GET)

    app.get("/getvedio" , getvedio)
        // Route for signing up a user (via POST)

    app.post("/postusers"  ,signupuser)
        // Route for fetching user details based on user ID (via GET)

    app.get("/getuser/:id" , getuser)
        // Route for logging in a user (via POST) with login validation middleware first

    app.post("/login" ,loginvalidation, loginuser)
    // app.get("/getvedio" , getvedio)
        // Route for editing a comment (via POST) with comment ID as a parameter

    app.post("/editcoment/:id" , editcoment)
        // Route for deleting a comment (via DELETE) with comment ID as a parameter

    app.delete("/delcoment/:id" , deletecomment)
        // Route for creating a new channel (via POST) with channel ID as a parameter

    app.post("/postchanel/:id" , postchanel )
        // Route for fetching all users (via GET) based on user ID as a parameter

    app.get("/getusers/:id" , getusers)
        // Route for adding a video to a channel (via POST) with channel and video IDs as parameters

    app.post("/addvedio/:id/:ids" , addvedioinchanel)
        // Route for getting videos by channel ID (via GET) with channel and video IDs as parameters

    app.get("/getvediobychanelid/:id/:ids" , getvedionychanelid)
        // Route for adding a subscriber to a channel (via PUT) with channel and user IDs as parameters

    app.put("/addsubscriber/:id/:ids" , addsubscriber)
        // Route for adding a video to a playlist (via POST) with user ID as a parameter

    app.post("/addplaylist/:id" , addonplaylist )
        // Route for liking a video (via POST) with video ID as a parameter

    app.post("/like/:id" , like)
        // Route for disliking a video (via POST) with video ID as a parameter

    app.post("/dislike/:id" , dislike)
        // Route for deleting a video from a channel (via POST) with channel and video IDs as parameters

    app.post("/dletevedioinchanel/:id/:ids" ,deletevedioinchanel)
        // Route for liking a comment (via POST) with comment ID as a parameter

    app.post("/likecoment/:id" , likecoment)
        // Route for disliking a comment (via POST) with comment ID as a parameter

    app.post("/dislikecoment/:id" , dislikecoments)
        // Route for deleting a channel (via POST) with channel ID as a parameter

    app.post("/deletechanel/:id" ,deletechanel)
        // Route for fetching a channel by channel ID and user ID (via GET)

    app.get("/getchanel/:id/:ids" , getchanel)
    
    // app.post("/images" , upload.single("name"),image)

}
export default routes