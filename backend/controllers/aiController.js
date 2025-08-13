const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// @desc    Generate interview questions and answers
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(404).json({message: "Missing required fields"})
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        })

        let rawText = response.text;

        //Clean it: remove  ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "")  //remove starting ```json
            .replace(/```$/, "") //remove ending ```
            .trim(); //remove extra spaces

        const data = JSON.parse(cleanedText)

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message
        })
    }
}

// @desc    Generate explanation for interview questions 
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
    try{
        const {question} = req.body;
        if (!question) {
            res.status(404).json({message: "Question not found"})
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        });

        let rawText = response.text;

        //Clean it: remove  ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "")  //remove starting ```json
            .replace(/```$/, "") //remove ending ```
            .trim(); //remove extra spaces
    
        //Safe to parse
        const data = JSON.parse(cleanedText)

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message
        })
    }
}

const checkAnswers = async (req, res) => {
    try {
        const {qsnAnsObject} = req.body

        if (!qsnAnsObject) {
            res.status(404).json({message: "Question & Answers Not Found!"})
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to check answers",
            error: error.message
        })
    }
}

module.exports = {generateInterviewQuestions, generateConceptExplanation}