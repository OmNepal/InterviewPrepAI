import React, { useContext, useState } from "react";

import HERO_IMAGE from "../assets/hero-image.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import {LuSparkles} from "react-icons/lu";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard")
    }
  };
  
  return (
    <>
      <div className = "w-full min-h-full bg-[#FFFCEF]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"/>

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10"> 
          {/*Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>
            { user ? ( 
              <ProfileInfoCard />
             ) : ( <button className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
            onClick = {() => setOpenAuthModal(true)}
            >
              Login /Sign Up
            </button>
             )}
          </header>

          {/*Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-powered
                </span> {" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Practice with role-specific interview questions, expand answers and dive deeper into concepts. Get personalized feedback to master any concept. This is your one-stop-shop for interview preparation.
              </p>

              <button 
              className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
              onClick = {handleCTA} 
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 mb-56"> 
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img 
              src={HERO_IMAGE} 
              alt="Hero Image" 
              className="w-[80vw] rounded-lg" 
              />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] pt-20 pb-20 mt-15 container mx-auto px-4">
          <div className="text-semibold text-center text-3xl md:text-4xl mb-10">
            Features That Make You Shine
          </div>
          <div className="max-w-[1200px] mx-auto">
            {APP_FEATURES.map((f, index) => (
              <div key={index} className="flex flex-col px-10 py-6 bg-white rounded-lg shadow-md shadow-amber-100 mb-8 border border-amber-200 md:text-center text-left hover:shadow-amber-200">
                <div className="text-xl font-semibold mb-4 md:text-2xl">{f.title}</div>
                <div className="text-base md:text-lg">{f.description}</div>
              </div>
              
            ))}
          </div>
        </div>
      </div> 

      <Modal 
        isOpen = {openAuthModal}
        onClose = {() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage = {setCurrentPage}/>
          )}
          {currentPage === "signup" && (
            <Signup setCurrentPage = {setCurrentPage}/>
          )}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage