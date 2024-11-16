
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";

const VideoPage = () => {
    const [comment,setcomment]=useState('');
    const [allcomments,setallcomments]=useState([]);
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setdata] = useState([]);
    const params = useParams();
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/api/videos`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,}});
          if (!response.ok) {
              throw new Error('Failed to fetch video data');
          }
          const data = await response.json();
          setdata(data);
      } catch (error) {
          console.error("Error fetching video data:", error);
      }
  };
  useEffect(() => {fetchData();}, []);
  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/video/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video data');
                }
                const data = await response.json();
                setVideoData(data);
                setallcomments(data.comments);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching video data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddLike = async () => {
      try {
          const response = await axios.post(`http://localhost:5000/api/video/like/${videoData._id}`);
          if (response.status === 200) {
              setVideoData(prevData => ({
                  ...prevData,
                  likes: prevData.likes + 1
              }));
              alert("Like added");
          }
      } catch (err) {
          console.error("Error adding like:", err);
          alert("Failed to add like. Please try again.");
      }
  };
    const handleAdddisLike = async () => {
      try {
          const response = await axios.post(`http://localhost:5000/api/video/like/${videoData._id}`);
          if (response.status === 200) {
              setVideoData(prevData => ({
                  ...prevData,
                  dislikes: prevData.dislikes + 1
              }));
              alert("disLike added");
          }
      } catch (err) {
          console.error("Error adding like:", err);
          alert("Failed to add dislike. Please try again.");
      }
  };
    

    // shows loading page till fetching complete
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    if (!videoData) {
        return <h1>Video not found.</h1>;
    }
    
    // create a new comment 
    async function createComment( commentText) {
      const url = 'http://localhost:5000/api/video/comment';
      let Id = videoData._id;
      const username = localStorage.getItem('username');
      const commentData = {
          videoId: Id,
          user: username,
          text: commentText
      };
      try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        const {comments}= result.video;
        setallcomments(comments);
        console.log('Comment updated successfully:', result,"comments",comments);
        return result;
    } catch (error) {
        console.error('Error updating comment:', error);
    }
  }
  return (<div>
        <Header/>
      <div className="video-page">
      <div className="video-section">
        <iframe
          className="video-frame"
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/sGUkyOLTX24?si=TpLfmYa3uaPqREWo"
          title="React JS roadmap | chai aur react series"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="video-details">
          <h1>{videoData.title}</h1>
          <div className="channel-info">
            <img src={videoData.thumbnailUrl} alt="Channel Logo" className="channel-logo" />
            <div className="channel-details">
              <h2>{videoData.channelId}</h2>
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
          <div className="video-btn">
          <p>{videoData.views} views • {videoData.uploadDate}</p>
          <button onClick={handleAddLike}><FaRegThumbsUp />{videoData.likes}</button>
          <button onClick={handleAdddisLike}>{videoData.dislikes}<FaRegThumbsDown /></button>
          </div>
          <p>
            {videoData.description}..
          </p>
          <button className="show-more">Show more</button>
        </div>
      </div>

      <div className="playlist-section">
        <h3>UP-NEXT</h3>
        <ul className="playlist">
        {data.map((data)=>(<Link className='linktag' key={data.videoId} to={`/video/${data.videoId}`} ><VideoCard key={data.videoId} data={data}/></Link>))}
        </ul>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comment-input">
            <input type="text" placeholder='comments' onChange={(e)=>setcomment(e.target.value)}/>
            <button onClick={()=>createComment(comment)}>add comment</button>
        </div>
        {allcomments.map((data,index)=>(<div className="comment" key={index}><p><strong>@{data.user}</strong>{data.text}</p></div>))}
        <div className="comment">
          <p>
            <strong>@teacher</strong> it is a very lovely video much love...
          </p>
        </div>
        <div className="comment">
          <p>
            <strong>@Harshbanna</strong>great video man. helped alot thanks .
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VideoPage;
