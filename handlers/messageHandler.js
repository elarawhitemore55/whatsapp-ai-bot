const getAIReply = require('./aiHandler');

const {
    enableChat,
    disableChat,
    isChatEnabled
} = require('../database/chatSettings');

module.exports = async (client, msg) => {

    const text = msg.body.toLowerCase().trim();

    // Enable chatbot
    if (msg.fromMe && text === '/chatbot on') {

        enableChat(msg.to);

        await client.sendMessage(
            msg.to,
            '✅ Successfully *Enabled* Chatbot for this chat'
        );

        return;
    }

    // Disable chatbot
    if (msg.fromMe && text === '/chatbot off') {

        disableChat(msg.to);

        await client.sendMessage(
            msg.to,
            '✅ Successfully *Disabled* Chatbot for this chat'
        );

        return;
    }

    // Ignore your own messages
    if (msg.fromMe) return;

    // Ignore chats where chatbot is OFF
    if (!isChatEnabled(msg.from)) return;

    try {

        const reply = await getAIReply(msg.body);

        await client.sendMessage(msg.from, reply);

    } catch (error) {

        console.error("AI Error:", error);

        try {
            await client.sendMessage(
                msg.from,
                "Oops 😅 Something went wrong."
            );
        } catch (e) {
            console.error("Send Error:", e);
        }
    }

};