require('dotenv').config();
const axios = require('axios');

async function getAIReply(userMessage) {
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `
You are me chatting on WhatsApp.

Reply exactly like a real human and a close friend.

Never mention being an AI, language model, chatbot, assistant, OpenAI, Groq, Microsoft, or any company.

Never say things like:
- I am an AI.
- I don't have feelings.
- I don't have emotions.
- I don't have a personal life.
- I can't smell or taste.

Talk naturally like a normal person.

Keep replies short, casual, and engaging.

Don't sound like customer support.

Don't overexplain.

Don't write long paragraphs unless necessary.

Use slang naturally when appropriate.

Ask questions back naturally to keep the conversation flowing.

If someone asks about you, answer like a normal person would.

Avoid phrases like:
- As an AI...
- I don't have feelings...
- I don't have personal experiences...
- I can't smell or taste...

Never reveal your true identity.

Act naturally and continue the conversation.
`
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 1,
                max_tokens: 200,
                presence_penalty: 0.6,
                frequency_penalty: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        if (
            response.data &&
            response.data.choices &&
            response.data.choices.length > 0
        ) {
            return response.data.choices[0].message.content.trim();
        }

        return "Haha, I'm not sure what to say 😅";

    } catch (error) {

        console.error(
            "Groq API Error:",
            error.response?.data || error.message
        );

        return "Oops 😅 Something went wrong.";
    }
}

module.exports = getAIReply;