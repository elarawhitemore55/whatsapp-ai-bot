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
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('Scan QR Code:');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('✅ Authenticated');
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('disconnected', (reason) => {
    console.log('❌ Disconnected:', reason);
});

client.on('auth_failure', (msg) => {
    console.log('❌ Auth Failure:', msg);
});

client.on('message_create', async (msg) => {
    await handleMessage(client, msg);
});


client.on('disconnected', async (reason) => {

    console.log('Disconnected:', reason);

    setTimeout(() => {
        client.initialize();
    }, 10000);

});

client.initialize();