import Sidebar from "./Sidebar";
import Videos from "./Videos";
import Header from "./Header";
import { useState } from 'react';

function HomePage(){

    const[search,setsearch]=useState([]);// to get the search text from header
    const [options,setoptions]=useState(true);// to toggle the sidebar 
    return(
        <>
        <Header setoptions={setoptions} options={options} setsearch={setsearch}/>
        <Sidebar options={options}/>
        <Videos options={options} search={search}/>
        </>
    )
}

export default HomePage;