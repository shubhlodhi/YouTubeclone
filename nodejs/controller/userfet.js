import { userdetaillist ,commentdata, vedio, commentsection  , userinfo, chaninfo} from "../model/create_user.js"

// import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs';


import Joi from "joi"

// Dislike a video: This function allows a user to dislike a video by incrementing the dislikes counter of the video by 1.


export async function dislike(req ,res){
    const id  = req.params.id // Retrieve video ID from the URL params
    const vid = await vedio.findById(id) // Find the video in the database by ID
    if (!vid){
        res.json({messsgae:"id is not found"})
        // Return a message if the video is not found
    }
    vid.dislikes+=1
    // Increment dislikes counter
    vid.save()
    // Save the updated video
    res.json(vid)
    // Return the updated video object
}
// Like a video: This function allows a user to like a video by incrementing the likes counter of the video by 1.

export async function like(req ,res){
    const id = req.params.id
     // Retrieve video ID from the URL params
    const findid = await vedio.findById(id)
    // Find the video by ID
    if(!findid){
        res.json({message:"id is not found"})
        
    }

    findid.likes +=1
    findid.save()
    res.json({message:findid})
}
// Add a video to the user's playlist: This function adds a specific video to the playlist of a user.

export async function addonplaylist(req ,res){
    const id = req.params.id // Retrieve user ID from the URL params
    const {vedioid} = req.body // Retrieve the video ID from the request body
    const findid = await userinfo.findById(id) // Find the user by ID
    if(!findid){
        res.json({message:"id is not found"})
    }
    const vedioss = findid.playlist.push(vedioid)
    // Add the video to the user's playlist
    await findid.save()
    res.json({message:findid.playlist})
    // Return the updated playlist
    

}
// Get videos in a specific channel: This function retrieves the channel's details along with its videos.

export async function getvedionychanelid(req ,res){
    const id = req.params.id // Retrieve user ID from URL params
    const ids = req.params.ids // Retrieve channel ID from URL params
    // const idss = req.params.idss
    const findid = await userinfo.findById(id)
    const findu = findid.channels.find(data=>data._id==ids) // Find the specific channel in the user's channels
    // const lastfind = findu.vedio.find(data=>data._id==idss)
    res.send(findu)


}
// Delete a video from a channel: This function deletes a video from a specific channel.

export async function deletevedioinchanel(req ,res){
    const id = req.params.id // Retrieve user ID from URL params
    const ids = req.params.ids // Retrieve channel ID from URL params
    const {idss}  = req.body // Retrieve the video ID to delete from the request body
    const finddata = await userinfo.findById(id)
    if(!finddata){
        res.json({messgae:"id is not found"}) // Return a message if the user is not found
    }
    const findchanelid = finddata.channels.find(data=>data._id ==ids) // Find the specific channel by ID
    if(!findchanelid){
        res.json({message:" channel id is not found"}) // Return a message if the channel is not found
    }
    const findvedio = findchanelid.addvedio.find(data=>data == idss)
    if (!findvedio){
        res.json({message:"vedio is not found"}) // Remove the video from the channel's video list
    }
    findchanelid.addvedio.splice(findvedio,1)
    await finddata.save()
    res.json({message:findvedio})
    

}
// export async function deletevedioinchanle(req ,res){
//     const id = req.params.id
//     const ids = req.params.ids
//     const findid = await userinfo.findbyId(id)
//     // const findid = await vedio.findByIdAndDelete(id)
// }
// Add a video to a channel: This function allows a user to add a video to a specific channel.

export async function addvedioinchanel(req ,res){
    const id = req.params.id
    const ids = req.params.ids
    const {title , vedioid , description ,url, chanelid , uploader ,
        views , likes , dislikes ,category ,chanleimage} = req.body

    const finddata = await userinfo.findById(id)
    if (!finddata){
        res.status(400).json({message:"id is not valid"})
    }
  
    const fu = finddata.channels.find(data=>data._id == ids)
    const videoId = url.split('/').pop(); // Extract the video ID from the URL
    const ved = await vedio.create({
        title:title , vedioid:vedioid , description:description ,url:videoId, chanelid:chanelid , uploader:uploader ,
        views:views , likes:likes , dislikes:dislikes ,category:category , chanleimage:chanleimage
    })
    await ved.save()  // Save the new video document
    fu.addvedio.push(
        ved._id
    )
    finddata.save() // Save the updated user document
    res.send(finddata)
    
}
// Get user details: This function retrieves a user's details by their ID.

export async function getuser(req ,res){
    const id = req.params.id // Retrieve user ID from the URL params
    const finddata = await userinfo.findById(id)
    if (!finddata){
        res.send("user is not found")
    }
    res.send(finddata) // Return a message if the user is not found
}
// Add a subscriber to a channel: This function allows a user to subscribe to a specific channel.


export async function addsubscriber(req ,res){
    const id = req.params.id // Retrieve user ID from the URL params
    const ids = req.params.ids // Retrieve channel ID from the URL params
    const findid = await userinfo.findById(id)
    if(!findid){
        res.json({message:"id is not found"})  // Return a message if the user is not found
    }
    const findchnaleid = findid.channels.find(data=>data._id == ids)
    // Find the specific channel by ID
    if(!findchnaleid){
        res.json({message:"idss is not found"})

    }
    // Delete a channel: This function allows a user to delete a specific channel from their account.
    findchnaleid.subscriber+=1
    findid.save()
    res.json({message:findchnaleid.subscriber})
    

}
// Delete a channel: This function allows a user to delete a specific channel from their account.

export async function deletechanel(req ,res){
    const id = req.params.id // fetch the id 
    const {ids} = req.body // fetch the id from body
    if(!id){
        res.status(400).json({messgae:"id is not found"})

    }
    const findchanel = await userinfo.findById(id) // find the user by id
    if(!findchanel){
        res.status(500).json({message:"user is not found"})

    }
    const findid = findchanel.channels.find(data=>data._id==ids) //find the channel of specific user using id
    if(!findid){
        res.status(400).json({message:"chanleid is not found"})
    }
    findchanel.channels.splice(findid ,1) // delete the channel we find on the array
    findchanel.save() //save the channel
    res.status(200).json({messgae:"chanle not found" , data:findchanel})
}
// Get a channel's details: This function retrieves the details of a specific channel by its ID.

export async function getchanel(req ,res){
    const id = req.params.id
    const ids = req.params.ids
    // if user id is not found then return status 400 with messgae
    if(!id){
      return   res.status(400).json({message:"user id is  not found" , success:false})
    }
    // if channel id is not found then return status 400 with messgae
    if(!ids){
        return res.status(400).json({message:"channel id is not found" , success:false})
    }
    const chanel = await userinfo.findById(id)
    // find the user by id
    if(!chanel){
        return res.status(400).json({message:"channel not found" , success:false})
    }
    const chanelid = chanel.channels.find(data=>data._id == ids)
    // find the channel using chnaelid
    if(!chanelid){
        return res.status(400).json({message:"channel id is  not found" , success:false})
    }
   
    return res.status(200).json({message:"data found" , data:chanelid , success:true})
    


}
// Post a new channel: This function allows a user to create a new channel under their account.

export async function postchanel(req, res) {
    
    const id = req.params.id; // get the id 
    const { chanelid, chname, owner, description, chanelbanner, subscriber } = req.body;
    // take the data from body request
    // const {fieldname , filename} = req.file
// if not found then rtuen error amd message
    if (!id) {
        return res.status(400).send({ error: "User ID is required" });
    }
// if not found the chname and type chname is not string then return error
    if (!chname || typeof chname !== "string") {
        return res.status(400).send({ error: "Channel name (chname) is required and must be a string" });
    }
// use try catch functinality for better exoirenece
    try {
        const finduser = await userinfo.findById(id);

        if (!finduser) {
            return res.status(404).send({ error: "User not found" });
        }

        // Push channel data to the user's channels array
        finduser.channels.push({
            chanelid,
            chname,
            owner,
            description,
            chanelbanner,
            subscriber,
           
           
        });
// save the data and store it on the database
        await finduser.save();
        res.status(201).send(finduser);
        console.log(req.file)
    } catch (error) {
        console.error("Error saving channel:", error);
        res.status(500).send({ error: error.message });
    }
}
// Delete a comment: This function deletes a specific comment from a video.

export async function deletecomment(req ,res){
    const id = req.params.id
    // find the id from parameter
    const {comid} = req.body
    // get data from request body 
    if(!id){
        res.send("id is not define")
    }
    // 
    const findid  = await vedio.findById(id)
    if(!findid){
        res.send("id is not found")
    }
    const comids = findid.commentsection.find(data=>data._id == comid)
    if(!comids){
        res.send("comment is not exist")
    }
    const delid = findid.commentsection.splice(comids , 1)
    await findid.save()
    res.send(delid)
    


}
// Function to like a comment

export async function likecoment(req ,res){
    const id = req.params.id
    const {comid} = req.body
    if (!id){
        res.json({message:"id is not find"})
    }
    if(!comid){
        res.json({message:"comid is not found"})
    }
    const findvedio = await vedio.findById(id)
    if(!findvedio){
        res.json({message:"vedio is not exist"})
    }
    const vediocoment = findvedio.commentsection.find(data=>data._id==comid)
    if(!vediocoment){
        res.json({message:"comment is not find"})
    }
    if (vediocoment.dislikes <= 0 ){
        vediocoment.likes +=1
        vediocoment.dislikes=1
    }
    else{
    vediocoment.likes+=1
    vediocoment.dislikes-=1
    // vediocoment.likes+=1
    // vediocoment.dislikes-=1
    }
    findvedio.save()
    res.json({message:findvedio.commentsection})




}
    
    // Function to dislike a comment


export async function dislikecoments(req ,res){
    const id = req.params.id
    const {comid} = req.body
    if (!id){
        res.json({message:"id is not find"})
    }
    if(!comid){
        res.json({message:"comid is not found"})
    }
    const findvedio = await vedio.findById(id)
    if(!findvedio){
        res.json({message:"vedio is not exist"})
    }
    const vediocoment = findvedio.commentsection.find(data=>data._id==comid)
    if(!vediocoment){
        res.json({message:"comment is not find"})
    }
    if (vediocoment.likes <= 0 ){
        vediocoment.likes =1
        vediocoment.dislikes+=1
    }
    else{
    vediocoment.likes-=1
    vediocoment.dislikes+=1
    }
    findvedio.save()
    res.json({message:findvedio.commentsection})




}
// Function to edit a comment

export async function editcoment(req ,res){
     const id = req.params.id
     const {comid , text} = req.body
     const findid = await vedio.findById(id)
     if(!findid){
        return res.json({messgae:"id is not found" })

     }
 
     const gu = findid.commentsection.find(data=>data._id == comid)
     gu.text = text
     await findid.save()
     res.send(gu)

}
export const loginvalidation = (req ,res ,next) =>{
    const schemas = Joi.object({
        
        email:Joi.string().email().required(),
        passcode:Joi.string().min(4).max(10).required(),
        
    })
    const {error} = schemas.validate(req.body)
    if (error){
        return res.json({message:"error ocuured field is required"})
    }
next()}
// Function to handle user login

export async function loginuser(req, res) {
    const { email, passcode } = req.body;

    if (!email || !passcode) {
        return res.status(400).json({ message: "Email and passcode are required", success: false });
    }

    try {
        const findemail = await userinfo.findOne({ email });
        if (!findemail) {
            return res.status(404).json({ message: "Email does not exist", success: false });
        }

        const isPasscodeValid = bcrypt.compareSync(passcode, findemail.passcode);
        if (!isPasscodeValid) {
            return res.status(400).json({ message: "Invalid passcode", success: false });
        }

        // let token = jwt.sign({ email }, process.env.SECRET_JWT, { expiresIn: "24h" });

        res.json({
            message: "Login successful",
            success: true,
            
            name: findemail.email,
            user: findemail.username,
            userId: findemail._id,
            avatar : findemail.avatar
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}
// export const signupvalidaion = (req ,res ,next) =>{
//     const schema = Joi.object({
//         channel_id:Joi.string().optional(),
//         username:Joi.string().min(4).max(200).required(),
//         email:Joi.string().email().required(),
//         passcode:Joi.string().min(4).max(10).required(),
//         avatar: Joi.string().optional(),
//     })
//     const {error} = schema.validate(req.body)
//     if (error){
//         return res.json({message:"error ocuured field is required" , error} )
//     }
// next()

    
// }
// Function to handle user signup

export async function signupuser(req ,res){
    const {channel_id , username , email , avatar ,passcode} = req.body

    const findemail = await userinfo.findOne({email})
    if(findemail){
        res.status(400).json({mesasage:`email is already exist ${findemail}`  })
    }
   
    const finddt = await userinfo.create({
        channel_id:channel_id,
        username:username,
        email:email,
        passcode:passcode,
        avatar:
            
        avatar,
        // key:jsontoken
        

    })
    finddt.passcode =  bcrypt.hashSync(passcode ,10)

    finddt.save().then(data=>
        res.send(data)
    )


  



} 
// Function to fetch details of a specific user


export async function getusers(req ,res){
    const id = req.params.id
    if(!id){
        res.json({messahe:"id does not exist"})
    }
    const dat = await userinfo.findById(id)
    if (!dat){
        res.json({messahe:"data is not returned"})
    }
    const chanelses = dat.channels.map(data=>data)
    res.send(chanelses)
}
// Function to create a new user detail record


export async function postnewuser(req ,res){
    const {name , age , hobby} = req.body
    const newuser = await userdetaillist.create({
        name:name,
        age:age,
        hobby:hobby,

    })
    await newuser.save().then(data=>{
        res.send(data)
    })

}

// Function to create a new video post


export async function postvedio(req ,res) {
    const {
        vedioid ,title ,url ,
        description , chanelid 
        ,uploader ,views , likes ,dislikes,category,chanleimage
        


     } = req.body
     
     const videoId = url.split('/').pop();

     const vedios = await vedio.create({
        vedioid:vedioid,
        url:videoId,
        title:title,
        description:description , chanelid:chanelid 
        ,uploader:uploader ,views:views , likes:likes ,
        dislikes:dislikes,
        category:category,
        chanleimage,chanleimage
        
     })
     if(!category){
        res.json({message:"category si not found" ,success:false})
     }
     if(!title){
        res.json({message:"title si not found" ,success:false})
     }
     if(!description){
        res.json({message:"description si not found" ,success:false})
     }
     if(!url){
        res.json({message:"url si not found" ,success:false})
     }

     await vedios.save()
     res.json({message:"createting successfuly" ,success:true} )

    
}
// Function to get all videos

export async function getvedio(req ,res) {
    const find = await vedio.find()
    res.send(find)
    
} 
// Function to post a comment on a video

export async function postcoment(req ,res){
    const id = req.params.id
    const {userid , text , timestamp , likes , dislikes} = req.body
    const finddata = await vedio.findById(id)

    const dt = finddata.commentsection.push({userid , text , timestamp , likes ,dislikes})
    finddata.save()
    res.json({message:dt})


    // const finddatas = await commentsection.create({
    //     userid:userid,
    //     text:text,
    //     timeStamp:timestamp
    // })

    // finddatas.save().then(data=>
    //     res.send(data)
    // )

    
}
// export async function getvedio(req ,res){
//     // const {id} = req.body
//     const lo = await vedio.find()
//     res.send(lo)



// }
export async function signup(req ,res) {
    
    
}

