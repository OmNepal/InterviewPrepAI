import React, { useContext, useState } from "react";
import Input from "../../components/Inputs/Input"
import { useNavigate } from "react-router-dom";
import {validateEmail} from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      setError("Please fill out all fields!")
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return;
    }
 
    setError("");

    //Signup API call
    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name,
          email, 
          password
        })

        const {token} = response.data;

        if (token) {
          localStorage.setItem("token", token),
          updateUser(response.data)
          navigate('/dashboard')
        }
    } catch (e) {
      if (e.response || e.response.data.message) {
        setError(e.response.data.message)
    } else {
        setError("Something went wrong. Please try again.")
    }
  }
}

  return (
    <div className="w-[90vw] md:w-[30vw] p-7 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold">Create an account</h3>
      <div className="text-slate-700 mt-2 mb-6">Please enter your details to signup</div>
      <form onSubmit={handleSignup}>
        <Input 
          value = {name}
          onChange = {({target}) => setName(target.value)}
          label = "Name"
          placeholder = "John Cena"
          type = "text"
        />
        <Input 
          value = {email}
          onChange = {({target}) => setEmail(target.value)}
          label = "Email Address"
          placeholder = "john.cena@example.com"
          type = "email"
        />
        <Input 
          value = {password}
          onChange = {({target}) => setPassword(target.value)}
          label = "Password"
          placeholder = "Min 8 characters"
          type = "password"
        />

        {error && <p className="text-red-500">{error}</p>}
        
        <button
          type = "submit"
          className="btn-primary"
        >
          SIGN UP
        </button>

        <p className="text-center">
          Already have an account? 
          <span className="text-orange-600 hover:underline cursor-pointer" onClick={() => setCurrentPage("login")}> Login</span>
        </p>  
      </form>
    </div>
  )
}

export default Signup