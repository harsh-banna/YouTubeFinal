import { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { ImYoutube2 } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdEmergencyRecording } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

function Header({setoptions,options,setsearch}) {
    let imgurl = localStorage.getItem('image');
    const [text,settext]=useState([]);
    // if user has already logined then the img will appear else the sigin and login will appear
    if (imgurl) {
        return(
            <>
            <div className='header'>
                <div className='head1'>
                <h1 className='hamburgermenu' onClick={()=>{
                    setoptions(!options)
                }}><GiHamburgerMenu /></h1>
                <Link className='linktag' to={"/"}><ImYoutube2 className='yticon'/></Link>
                </div>
                <div className='head2'>
                <input type="text" onChange={(e) => settext(e.target.value)}/>
                <button onClick={() => setsearch(text)}>🔍</button>
                </div>
                <div className='head3'>
                    <h1 className='icon'><Link className='linktag' to={"/channel"}><MdEmergencyRecording /></Link></h1>
                    <h1 className='icon'><IoIosNotifications /></h1>
                    <img className='iconimg' src={imgurl} alt="" />
                    </div>
            </div>
            </>
        )
    } else {
        return(
            <>
            <div className='header'>
                <div className='head1'>
                <h1 className='hamburgermenu' onClick={()=>{
                    setoptions(!options)
                }}><GiHamburgerMenu /></h1>
                <ImYoutube2 className='yticon'/>
                </div>
                <div className='head2'>
                <input type="text" onChange={(e) => settext(e.target.value)}/>
                <button onClick={() => setsearch(text)}>🔍</button>
                </div>
                <div className='head3'>
                <h1 className='icon'><MdEmergencyRecording /></h1>
                <h1 className='icon'><IoIosNotifications /></h1>
                    <div> 
                    <Link to={'/login'}>login</Link>
                    <hr/>
                    <Link to={'/signin'}>signin</Link> 
                    </div>
                    </div>
            </div>
            </>
        )
    }
}

export default Header;