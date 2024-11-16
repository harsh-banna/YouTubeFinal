import mongoose from "mongoose";

const videosSchema =new mongoose.Schema({
    videoId:String,
    title:String,
    thumbnailUrl:String,
    description:String,
    channelId:String,
    views:Number,
    likes:Number,
    dislike:Number,
    uploadDate:String,
    comments:Array,
})

const videosModel = mongoose.model("videos",videosSchema);

export default videosModel;