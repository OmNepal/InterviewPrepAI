const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
        You are an AI trained to generate technical interview questions and answers.

        Task: 
        - Role: ${role}
        - Candidate Experience:  ${experience} years
        - Focus Topics: ${topicsToFocus}
        - Write ${numberOfQuestions} interview questions
        - For each question, generate a detailed but beginner-friendly answer.
        - If the answer needs a code example, add a small code block inside. 
        - Kepp formatting very clean
        - Return a pure JSON array like: 
        [
            {
                "question": "Question here?",
                "answer": "Answer here"
            },
            ...
        ]
            Important: Do NOT add any extra text. Only return valid JSON.
    `)

    const conceptExplainPrompt = (question) => (`
        You are an AI trained to generate explanations for a given interview question.

        Task:
        - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
        - Question: "${question}"
        - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
        -If the explanation includes a code example, provide a small code block.
        - Kepp the formatting very clean and clear.
        - Return the result as a valid JSON object in the following format: 

        {
            "title": "Short title here",
            "explanation": "Explanation here"
        }
        
        Important: Do NOT add any extra text. Only return valid JSON.  
    `)

    const checkAnswersPrompt = (qsnAnsObject) => (`
        You are an AI that will give feedback to a user's answers to some interview questions.

        Task:
        - You will get a JSON object which contains questions as the keys and the user's answers to those questions as the values
        - JSON Q&A Object: "${qsnAnsObject}"
        - Check the user's answers to the questions and give feedback to the answers in 2-3 sentences. 
        - Highlight what the user got correct and what they got wrong
        - If the answer is empty, just return 'You did not answer'
        - After checking all the answers, also give the user a list of topics that they should focus on based on their answers
        - Kepp the formatting very clean and clear.
        - Return the result as a valid JSON object in the following format: 
        {
            "feedback": JSON object (key: question, value: feedback)
            "topicsToFocus": Array of topics
        }

        Important: Do NOT add any extra text. Only return valid JSON.  
    `)

    module.exports = {questionAnswerPrompt, conceptExplainPrompt, checkAnswersPrompt}