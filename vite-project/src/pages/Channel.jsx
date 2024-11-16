import Header from "./Header";
import { useState,useEffect } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import data from "../assets/data";


function Channel(){
  const [channel, setChannel] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelHandle, setNewChannelHandle] = useState('');
  
  const userid = localStorage.getItem('userID');

  useEffect(() => {
    if (userid.length > 1) {
        fetchChannelByUserId(userid);
    }
  },[]);

  const fetchChannelByUserId = async (userid) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/channel/${userid}`);
        setChannel(response.data.channel);
        setNewChannelName(response.data.channel.name)
        setNewChannelHandle(response.data.channel.handle)
        // console.log('ch',response.data.channel,channel);
    } catch (error) {
        console.error('Failed to fetch channel', error);
    }
  };

  const createChannel = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/create', {
          name: newChannelName,
          handle: newChannelHandle,
          userId: userid,
        });
        setChannel(response.data.channel);
        // console.log('ch',response.data.channel);
    } catch (error) {
        console.error('Failed to create channel', error);
    }
};
   // if it is a new user create-channel page will show
   if(!channel){

    return(
      <>
       <div className="create-channel">
                    <h1>Create Channel</h1>
                    <div>
                    <label>Channel-Name: </label>
                    <input
                        type="text"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                    />
                    </div>
                    <div>
                    <label>Handle:@ </label>
                    <input
                        type="text"
                        value={newChannelHandle}
                        onChange={(e) => setNewChannelHandle(e.target.value)}
                    />
                    </div>
                    <button onClick={createChannel}>Create Channel</button>
                </div>
      </>
    )

   }
    //if channel already exist then channel page will appear or after creating channel
    return(
        <>
        <Header/>
        <div className="channel-page">
      <div className="banner">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7K3mcID_0D-_lH_W2DYTWQq11Jo3BN9D2bg&s' alt="Banner" className="banner-image" />
      </div>
      <div className="channel-info">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1VDymcuhCr0iAYAeTMjWf765VNqamh1u_A&s" alt="Channel Logo" className="channel-logo" />
        <div className="channel-details">
          <h1>{newChannelName}</h1>
          <p>@{newChannelHandle} • 123K subscribers • 321 videos</p>
          <p>Welcome to the official YouTube channel of {newChannelName}...</p>
          <a href="https://internshala.com">WEbsite.com </a>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
      
      <div className="tabs">
        <button>Home</button>
        <button className="active">Videos</button>
        <button>Shorts</button>
        <button>Live</button>
        <button>Playlists</button>
        <button>Community</button>
      </div>
      <div className="videos-section">
        {data.map((data,index)=>(<VideoCard key={index} data={data}/>))}
       </div>
       </div>
        </>
    )
}

export default Channel;