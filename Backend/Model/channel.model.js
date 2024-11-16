import mongoose from "mongoose";
import { fetchvideos } from "../Controller/videos.controller.js";

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    handle:{
        type:String,
        required:true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const channelModel = mongoose.model("channel",channelSchema);

export default channelModel;