const {
    enableChat,
    disableChat
} = require('../database/chatSettings');

async function handleCommand(client, msg) {

    const text = msg.body.toLowerCase();

    if (text === "/chatbot on") {

        enableChat(msg.from);

        await client.sendMessage(
            msg.from,
            "✅ Chatbot enabled for this chat."
        );

        return true;
    }

    if (text === "/chatbot off") {

        disableChat(msg.from);

        await client.sendMessage(
            msg.from,
            "✅ Chatbot disabled for this chat."
        );

        return true;
    }

    return false;
}

module.exports = handleCommand;