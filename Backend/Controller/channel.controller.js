import channelModel from "../Model/channel.model.js";


export async function createchannel (req, res)  {
    try {
        const { name, handle, userId } = req.body; // Ensure userId is sent from the client
        const channel = await channelModel.create({ name, handle, owner: userId });
        res.status(201).json({ success: true, message: 'Channel created successfully', channel });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Channel is not created', err });
}};

export async function fetchchannel (req, res)  {
    try {
        const userId = req.params.id;
        const channel = await channelModel.findOne({ owner: userId });
        
        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found' });
        }

        res.status(200).json({ success: true, channel });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch channel', error });
    }
}