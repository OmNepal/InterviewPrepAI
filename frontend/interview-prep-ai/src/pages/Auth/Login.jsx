import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input"
import {validateEmail} from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields")
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

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const {token} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
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
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold">Welcome Back</h3>
      <p className="text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin}>
        <Input 
          value={email}
          onChange = {({ target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
        />

        <Input 
          value={password}
          onChange = {({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-red-500"> {error}</p>}

        <button 
          type = "submit"
          className="btn-primary"
        >
          LOG IN
        </button>

        <p className="text-center text-slate-800">
          Don't have an account? 
          <span className="text-orange-600 hover:underline cursor-pointer" onClick = {() => setCurrentPage("signup")}> Signup</span> 
        </p>
      </form>
    </div>
  )
}

export default Login