import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {AnimatePresence, motion} from "framer-motion"
import { LuCircleAlert, LuListCollapse, LuNotebookPen } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const {sessionId} = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("")

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState(null)

  const [openAddNotesDrawer, setOpenAddNotesDrawer] = useState(false)
  const [notes, setNotes] = useState("");

  const [openWrittenPracticeDrawer, setOpenWrittenPracticeDrawer] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader, setIsUpdateLoader] = useState(false)

  //Fetch session data by session
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }

    } catch(error) {
      console.error("Error: ", error);
    }
  }

  // generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null)

      setIsLoading(true)
      setOpenLearnMoreDrawer(true)

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question
        }
      )

      if (response.data) {
        setExplanation(response.data)
      } 
    } catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate explanation, Try Again later")
      console.error("Error: ", error)
    } finally {
      setIsLoading(false);
    }
  }

  // Pin question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))

      console.log(response)

      if (response.data && response.data.question) {
        //toast.success('Question pinned successfully')
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  //Add more questions to a session
  const uploadMoreQuestions = async () => {
    try{
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 5,
      })

      const questions = aiResponse.data;
      

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions,
      })

      if (response.data) {
        toast.success("More Q&A Added!");
        fetchSessionDetailsById();
      }
    } catch(error) {
      setErrorMsg("Couldn't add more questions. Try again later.")
    } finally {
      setIsUpdateLoader(false);
    }
  }

  const handleAddNotes = () => {
    setOpenAddNotesDrawer(true);
  }

  const saveNotes = async (e) => {
    e.preventDefault();    
    const notes = (e.target.notes.value)
    setNotes(notes);

    try {
      const response = await axiosInstance.post(API_PATHS.SESSION.UPDATE_NOTE(sessionId), { notes })
      if (response.data.session) {
        toast.success("Notes Saved Successfully")
        setNotes(response.data.session.notes)
      }
    } catch (error) {
      console.log("Something went wrong: ", error)
    }
    
  }

  const handleWrittenPractice = () => {
    setOpenWrittenPracticeDrawer(true)
  }

  const handleWrittenPracticeSubmit = (e) => {
    e.preventDefault()

    const answers = e.target.ans

    const object  = {}
    sessionData.questions.forEach((e, i) => {
      object[e.question] = answers[i].value
    })
    console.log(JSON.stringify(object))
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    
  }, [])

  //set notes everytime session data changes
  useEffect (() => {
    if (sessionData)
      setNotes(sessionData.notes)
  }, [sessionData])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.role || ""}
        lastUpdated={
          sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
        }
        handleWrittenPractice={handleWrittenPractice}
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-3">
      <div className="flex justify-center grid grid-cols-12 ">
        <h2 className="text-lg font-semibold color-black col-span-6 md:col-span-5">Interview Q & A</h2>
        
        <button 
          className={`cursor-pointer col-span-6 ${
              openLearnMoreDrawer ? "md:col-span-3" : "md:col-span-5"
            }
            ${
              openAddNotesDrawer || openWrittenPracticeDrawer ? "hidden" : ""
            }
          `}
          onClick={handleAddNotes}
        >
            <LuNotebookPen  className="text-xl inline rounded"/>
            Add Notes
        </button>
      </div>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`col-span-12 ${
            openLearnMoreDrawer || openAddNotesDrawer || openWrittenPracticeDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div 
                    key={data._id || index}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15
                    }}
                    layout //This is the key prop that animates position changes
                    layoutId={`question-${data._id || index}`}//helps framer track specific items
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateConceptExplanation(data.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />

                    {!isLoading &&
                      sessionData?.questions?.length == index + 1  && (
                        <div className="flex item-center justify-center mt-5" >
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )} {" "}
                            Load More
                          </button>
                        </div>
                      )}
                     </>
                  </motion.div>
                )
              })}
            </AnimatePresence>

          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={()=> setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>

        <div>
          <Drawer
            isOpen={openAddNotesDrawer}
            title="Add Notes for this session"
            onClose={() => setOpenAddNotesDrawer(false)}
          >
            <form onSubmit={saveNotes} className="flex flex-col items-center justify-center">
              <textarea 
                name="notes" 
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full min-h-[calc(100vh-12rem)] border p-2"
              />        
              <button className=" w-16 btn-primary">
                Save
              </button>
            </form>
          </Drawer>
        </div>

        <div>
          <Drawer
            isOpen={openWrittenPracticeDrawer}
            onClose={() => setOpenWrittenPracticeDrawer(false)}
            title="Written Q&A Practice"
          >
            <form onSubmit={handleWrittenPracticeSubmit}>
              {sessionData?.questions?.map((q, i) => {
                return (
                  <div 
                    key={i}  
                    className="m-4"
                  >
                    <label htmlFor="ans">{i+1}. {q.question}</label>
                    <textarea 
                      name="ans"
                      className="border block w-full p-2 mt-2 rounded" 
                      placeholder="Answer"
                    />
                  </div>
                )
              })}

              <button className="btn-primary" type="submit">Submit Answers</button>
            </form>

          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep