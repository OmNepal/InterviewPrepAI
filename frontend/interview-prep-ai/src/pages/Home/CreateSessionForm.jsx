import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        topicsToFocus: "", 
        experience: "",
        description: "", 
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }))  
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const {role, experience, topicsToFocus} = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("")
    }

    return (
        <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Start a new interview journey
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
                <Input
                    value={formData.role}
                    onChange={({target}) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="Eg: Frontend Developer"
                    type="text"
                />
                <Input
                    value={formData.topicsToFocus}
                    onChange={({target}) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus On"
                    placeholder="Eg: React, UI/UX (Comma-Separated)"
                    type="text"
                />
                <Input
                    value={formData.experience}
                    onChange={({target}) => setRole("experience", target.value)}
                    label="Years of Experience"
                    placeholder="Eg: 1 year, 3years"
                    type="number"
                />
                <Input
                    value={formData.description}
                    onChange={({target}) => setRole("description", target.value)}
                    label="Short Description"
                    placeholder="Any notes for this session (Optional)"
                    type="text"
                />

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                <button 
                    type="submit"
                    className="btn-primary w-full mt-2"
                    disabled={isLoading}
                >
                 {isLoading && <SpinnerLoader />}    Create Session
                </button>             
            </form>
        </div>
    )
}

export default CreateSessionForm