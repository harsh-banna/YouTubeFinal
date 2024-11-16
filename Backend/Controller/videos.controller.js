import videosModel from "../Model/videos.model.js";

export function fetchvideos(req,res) {
    videosModel.find().then(data => {
        if(!data){
            return res.status(400).send('something went wrong');
        }
        return res.send(data);
    }).catch(err => res.status(500).json({message: `internal server error = ${err}`}))
}

export function fetchspecificvideo(req,res) {
    const 
    videoId = req.params.id;
    videosModel.findOne({videoId}).then(data => {
        if(!data){
            return res.status(400).send("Something went wrong");
        }
        return res.send(data);
    }).catch(err => res.status(500).json({message: `internal server error=${err}`}));
}

export function addcomment(req,res) {
    try {
        const{videoId,user,text}=req.body;
        const newcomment = {
            user:user,
            text:text,
        }
        videosModel.findByIdAndUpdate(
            videoId,
            { $push: { comments: newcomment } },
            { new: true }  
        ).then(updatedVideo => {
            if (!updatedVideo) {
                return res.status(404).json({ success: false, message: "Video not found" });
            }
            return res.status(200).json({ success: true, message: "Comment added successfully", video: updatedVideo });
        })
        .catch(err => res.status(500).json({ success: false, message: `Internal server error: ${err}` }));

    } catch (err) {
        res.status(500).json({
            success:false,
            msg:"server error"
        })
    }
}

export async function addLike(req, res) {
    const videoId = req.params.id;
    try {
        const video = await videosModel.findByIdAndUpdate(
            videoId,
            { $inc: { likes: 1 } },
            { new: true } 
        );

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Like added successfully",
            data: video,
        });
    } catch (error) {
        console.error("Error adding like:", error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}
export async function adddisLike(req, res) {
    const videoId = req.params.id;
    try {
        const video = await videosModel.findByIdAndUpdate(
            videoId,
            { $inc: { dislikes: 1 } },
            { new: true } 
        );

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "disLike added successfully",
            data: video,
        });
    } catch (error) {
        console.error("Error adding dislike:", error);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}