// import { number } from "joi";
// import { required } from "joi";
// Importing mongoose, the library for working with MongoDB in Node.js

import mongoose from "mongoose";

// Defining the schema for user details, where name, age, and hobby are stored as strings.

const userdeatils = new mongoose.Schema({
    "name":String,
    "age":String,
    "hobby":String
})
// Creating a model named 'userdetaillist' using the schema 'userdeatils', which will interact with the MongoDB collection

export const userdetaillist = mongoose.model("userdetaillist" , userdeatils)

// Defining the schema for storing comments,
//  with fields for comment text, author, and 
// the time the comment was made.

const commentinfo = new mongoose.Schema({
    "comment":String,
    "author":String,
    "time":String

})
// Creating a model 'commentdata' for the above schema to interact with MongoDB.

export const commentdata = mongoose.model("commentdata" , commentinfo)
// Defining the schema for a comment section, which includes:
// - userid: the ID of the user who posted the comment
// - dislikes: the number of dislikes, with a default value of 1000
// - timestamp: the date and time the comment was posted, with a default of the current date and time
// - text: the actual text of the comment
// - likes: the number of likes, with a default value of 1000
export const commentSchema = new mongoose.Schema({
    "userid":{
        type:String,
       

    },
    "dislikes": {
        type: Number,
        default: 1000, // Default value for dislikes
    },
    // text: {
        // type: String,
        // required: true, // Make text field mandatory
    // },
    "timeStamp": {
        type: Date,
        default: Date.now, // Default to current timestamp
    },

    "text":String,
    "likes":{
        type:Number,
        default:1000
    },
    
})
// Creating a model 'commentsection' for handling comment data in MongoDB

export const commentsection = mongoose.model("comente" , commentSchema)
// Defining the schema for storing video information:

const vedios = new mongoose.Schema({
    "vedioid":{
    type:String,
required:true},
    "title":{
        type:String,
        required:true,
    },
    "url":{
        type:String,
        required:true,
    },

    "description":{
        type:String,
        required:true,
    },
    "chanelid":{
        type:String,
        required:true,
    },
    "uploader":{
        type:String,
        required:true,
    },
    "views":{
        type:String,
        required:true,
    },
    "category":{
        type:String,
        required:true
    },
    "likes":{
        type:Number,
        required:true,
    },
    "dislikes":{
        type:Number,
        required:true,
    },
    "uploadedDate": {
        type: Date,
        default: Date.now(),
        required: true,
    },
    "chanleimage":{
        type:String,
        required:true
    },
    
    "commentsection":[commentSchema]

    
    





})
// Creating a model 'vedio' to handle video data in MongoDB

export const vedio = mongoose.model("vedio" , vedios)
// Defining the schema for channel information:

const chanelname = new mongoose.Schema({
    "chanelid":{
        type:String,
        required:true
    },
    "chname":{
        type:String,
        required:true
    },
    "owner":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "chanelbanner":{
        type:String,

        required:true
    },
    "filename":{
        type:String,
    },
    "fieldname":{
        type:String,
    },
    "subscriber":{
        type:Number,
        required:true,
        default:1000
    },
    "vedio":[vedios],
    "addvedio":[]

    
    
    
})
// Creating a model 'chaninfo' to handle channel data in MongoDB

export const chaninfo = mongoose.model("chanelinfo" , chanelname)
// Defining the schema for user data, which includes:
// - userid: unique user ID
// - username: user's name
// - email: user's email
// - passcode: user's password
// - avatar: user's avatar URL or image
// - channels: array of channels owned by the user
const userdata = new mongoose.Schema({
    "userid":{
        type:String,
        required:true
    },
    "username":{
        type:String,
        required:true,
    },
    "email":{
        type:String,
        required:true,
    },
    "passcode":{
        type:String,
        required:true
    },
    "avatar":{
        type:String,
        required:true
    },
    "channels":[chanelname]



})
// Creating a model 'userdet' to handle user data in MongoDB

export const userdet = mongoose.model( "userdeatil" , userdata )
// Defining the schema for user signup, with:
// - channel_id: the ID of the user's channel
// - username: user's name
// - email: user's email
// - passcode: user's password
// - avatar: user's avatar URL or image
// - channels: channels associated with the user
// - playlist: an array for storing playlists created by the user

const signup = new mongoose.Schema({
    "channel_id":{
        type:Number,
        required:true
    },
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "passcode":{
        type:String,
        required:true
    },
    // when want to upload an image file tot he avatar
    "avatar":{
        type:String,
        required:true
    },
    "channels":[chanelname],
    "playlist":[]


})
// Creating a model 'userinfo' to handle user signup data in MongoDB

export const userinfo = mongoose.model("singup"  ,signup)
