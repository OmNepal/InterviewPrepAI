import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input"

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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