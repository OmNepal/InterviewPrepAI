import React from "react";

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,      
    questions,
    description, 
    lastUpdated
}) => {
    return (
        <div className="bg-white relative">
            <div className="container flex flex-col md:flex-row items-start md:items-center mx-auto px-4 md:px-10 gap-6 md:gap-15">
                <div className="h-[175px] flex flex-col justify-center relative z-10 w-full md:w-auto md:mb-0">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-medium">{role}</h2>
                                    <p className="text-sm text-medium text-gray-900 mt-1">
                                        {topicsToFocus}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4">
                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Experience: {experience} {experience == 1 ? "Year" : "Years"}
                        </div>

                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            {questions} Q&A
                        </div>

                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Last Updated: {lastUpdated}
                        </div>                   
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto mb-6 md:mb-0">
                    <button className="flex flex-col justify-center z-20 bg-black/20 backdrop-blur-md border border-black/30 text-sm font-semibold text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-black/20 md:relative shadow-lg">
                       Written Practice
                    </button>

                    <button className="flex flex-col justify-center z-20 bg-black/20 backdrop-blur-md border border-black/30 text-sm font-semibold text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-black/20 md:relative shadow-lg">
                        Audio Practice
                    </button>
                </div>

                <div className="w-[40vw] md:w-[30vw] h-[175px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
                    <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob-1" />
                    <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob-2" />
                    <div className="w-16 h-16 bg-cyan-400 blur-[45px] animate-blob-3" />
                    <div className="w-16 h-16 bg-fuchsia-400 blur-[45px] animate-blob-1" />
                               
                </div>

            </div>
        </div>
    )
}

export default RoleInfoHeader