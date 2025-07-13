export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Signup
        LOGIN: "/api/auth/login", //Authenticate user and return JWT token
        GET_PROFILE: "/api/auth/profile" //Get logged-in user's profile
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", //Generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation" //Generate concept explanation using gemini
    },
    SESSION: {
        CREATE: "/api/sessions/create", //Create a new interview session with questions
        GET_ALL: "/api/sessions/my-sessions", //Get all sessions for the user
        GET_ONE: (id) => `/api/sessions/${id}`, //Get session details for a session id
        DELETE: (id) => `/api/sessions/${id}` //Delete a session based on session id
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", //Add more questions to a session
        PIN: (id) => `/api/questions/${id}/pin`, //Pin or unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note` //Update / Add a note to a question
    }
};