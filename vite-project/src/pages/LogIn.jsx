//

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {

  const [formData, setFormData] = useState({
        email: '',password: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let url="http://localhost:5000/api/login";
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response=await fetch(url,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
          })
          const data = await response.json();
          const { token } = data;
          const {image,username,_id}= data.user;
      
      localStorage.setItem('token', token);
      localStorage.setItem('image', image);
      localStorage.setItem('username', username);
      localStorage.setItem('userID', _id);
      navigate("/");
      alert('Login successful!');
    } catch (error) {
      console.log('Login failed. Please try again.',error);
    }
    };

    return(
        <>
        <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required
            className="inputsignin"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password" name="password" value={formData.password}
            onChange={handleChange}  required
            className="inputsignin"
          />
        </div>
        <button type="submit" className="signinbtn">
          Log In
        </button>
      </form>
    </div>
        </>
    )
}

export default LogIn;