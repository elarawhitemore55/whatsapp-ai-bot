const fs = require('fs');

const FILE = './database/enabledChats.json';

// Create file if it doesn't exist
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

function getChats() {
    return JSON.parse(fs.readFileSync(FILE));
}

function saveChats(chats) {
    fs.writeFileSync(FILE, JSON.stringify(chats, null, 2));
}

function enableChat(chatId) {
    const chats = getChats();

    if (!chats.includes(chatId)) {
        chats.push(chatId);
        saveChats(chats);
    }
}

function disableChat(chatId) {
    let chats = getChats();

    chats = chats.filter(id => id !== chatId);

    saveChats(chats);
}

function isChatEnabled(chatId) {
    return getChats().includes(chatId);
}

module.exports = {
    enableChat,
    disableChat,
    isChatEnabled
};