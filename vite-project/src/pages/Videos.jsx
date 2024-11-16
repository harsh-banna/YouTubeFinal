import { useState, useEffect } from 'react';
import './style.css';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

function Videos({options,search}){
    const [filtervid,setfiltervid]=useState([]);
    const [viddata,setviddata]=useState([]);
    
    // getting the token from localstorage
    const token = localStorage.getItem('token');
    //getting the data
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${token}`, }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }
            const data = await response.json();
            setfiltervid(data);
            setviddata(data);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    // to handle the search function
    function handlesearch(search) {
        console.log(search);
        const searchdata = viddata.filter((item) => 
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setfiltervid(searchdata);
    }
 
    useEffect(() => {
                if (search.length > 1) {
                    handlesearch(search);
                } else {
                    fetchData();
                }
            }, [search]);

    function handlefilter(genre){
        console.log(genre);
        const filterdata = viddata.filter((data) => 
            data.genre == genre);
        console.log('new data',filterdata);

        setfiltervid(filterdata);
    }

    return(
        <>
        <div className={`mainvid ${options?"largescreen":''}`}>
        <div className='filterbtn'>
            <button onClick={() => fetchData()}> HOME </button>
            <button onClick={() => handlefilter('js')}>JS</button>
            <button onClick={() => handlefilter('react')}>REACT</button>
            <button onClick={() => handlefilter('css')}>CSS</button>
        </div>
        <div className="viddiv">
            {filtervid.map((data)=>(<Link className='linktag' key={data.videoId} to={`/video/${data.videoId}`} ><VideoCard key={data.videoId} data={data}/></Link>))}
            </div>
        </div>
        </>
    )
}

export default Videos