
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [formdata,setformdata]=useState({
        username:"",
        email:"",
        password:""});

      const navigate=useNavigate();

      const handlesubmit=async(e)=>
        {
          e.preventDefault();
          try
          {
            const response=await fetch("http://localhost:5000/api/signup",{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify(formdata),
            })
            if (!response.ok) {
                throw new Error('Request failed');
              }
            const data = await response.json();
            console.log('Response data:', data);
            navigate("/login");
          }
          catch(err)
          {
            console.log(err,"error");
          }
        }  
        // it handles the change in input 
        const handlechange=(e)=>
            {
              const {name,value}=e.target;
              setformdata(prevstate =>({
                ...prevstate,
                [name]:value
              }))
            }
    return(
        <>
        <div className="signin">
            <h1>SIGN-IN PAGE</h1>
            <form onSubmit={handlesubmit}>
            <label htmlFor="username">USER-NAME</label>
            <input type="text" placeholder="username" name="username"  value={formdata.username}
            onChange={handlechange}/>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="email" name="email"  value={formdata.email}
            onChange={handlechange}/>
            <label htmlFor="password">PASSWORD</label>
            <input type="text" placeholder="password" name="password"  value={formdata.password}
             onChange={handlechange}/>
            <button type="submit">SIGN-IN</button>
            </form>
        </div>
        </>
    )
}

export default Signin;