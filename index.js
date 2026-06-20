require('./server');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const handleMessage = require('./handlers/messageHandler');

const client = new Client({

    authStrategy: new LocalAuth({
        clientId: 'main-bot'
    }),

    puppeteer: {
        headless: true,

        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,

        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--no-first-run',
            '--no-zygote'
        ]
    }
});


client.on('qr', (qr) => {

    console.log('📱 Scan QR Code:');

    qrcode.generate(qr, {
        small: true
    });

});


client.on('authenticated', () => {

    console.log('✅ WhatsApp authenticated');

});


client.on('ready', () => {

    console.log('✅ Bot is ready!');

});


client.on('auth_failure', (msg) => {

    console.log('❌ Authentication failed:', msg);

});


client.on('disconnected', (reason) => {

    console.log('❌ WhatsApp disconnected:', reason);

    setTimeout(() => {

        console.log('🔄 Restarting WhatsApp connection...');

        client.initialize();

    }, 10000);

});


client.on('message_create', async (msg) => {

    try {

        await handleMessage(client, msg);

    } catch (error) {

        console.error('Message handler error:', error);

    }

});


client.initialize();