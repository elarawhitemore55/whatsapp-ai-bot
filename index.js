require('./server');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const handleMessage = require('./handlers/messageHandler');

console.log('🚀 Starting WhatsApp AI Bot...');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'main-bot'
    }),

    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

console.log('📱 WhatsApp client created');

// QR Event
client.on('qr', (qr) => {
    console.log('📷 QR RECEIVED');
    qrcode.generate(qr, { small: true });
});

// Authentication Success
client.on('authenticated', () => {
    console.log('✅ WhatsApp authenticated');
});

// Authentication Failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

// Loading
client.on('loading_screen', (percent, message) => {
    console.log(`⏳ Loading ${percent}% - ${message}`);
});

// Ready
client.on('ready', () => {
    console.log('🤖 Bot is ready!');
});

// Disconnected
client.on('disconnected', (reason) => {
    console.log('⚠️ Disconnected:', reason);
});

// Errors
client.on('error', (error) => {
    console.error('❌ WhatsApp Error:', error);
});

// Messages
client.on('message_create', async (msg) => {
    try {
        await handleMessage(client, msg);
    } catch (error) {
        console.error('❌ Message Handler Error:', error);
    }
});

// Process Errors
process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

console.log('🔄 Initializing WhatsApp client...');

client.initialize()
    .then(() => {
        console.log('✅ Initialization started');
    })
    .catch((error) => {
        console.error('❌ Initialization failed:', error);
    });