import './style.css';
import { FaHome } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { MdOutlinePodcasts } from "react-icons/md";
import { CiMusicNote1 } from "react-icons/ci";
import { IoLibraryOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


function Sidebar({options}){
    // it is static sidebar which toggle with help of button in header
    return(
        <>
        <div className={`sidebar ${options?"":'notvisible'}`}>
        <div className={'sidebarinnear'}>
            <h1><FaHome /></h1>
            <p>Home
            </p>
        </div>
        <div>
            <h1><IoIosTrendingUp /></h1>
            <p>Trending
            </p>
        </div>
        <div>
            <h1><MdOutlinePodcasts /></h1>
            <p>Podcast
            </p>
        </div>
        <div>
            <h1><CiMusicNote1 /></h1>
            <p>Music
            </p>
        </div>
        <div>
            <h1><IoLibraryOutline /></h1>
            <p>Library
            </p>
        </div>
        <p>-SUBSCRIBRD-</p>
        <div>
            <h1><CgProfile /></h1>
            <p>T-series
            </p>
        </div>
        <div>
            <h1><CgProfile /></h1>
            <p>Logan paul
            </p>
        </div>
        <div>
            <h1><CgProfile /></h1>
            <p>Mr.beast
            </p>
        </div>
        </div>
        </>
    )
}

export default Sidebar;