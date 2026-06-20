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

        executablePath:
            process.env.CHROME_BIN ||
            process.env.PUPPETEER_EXECUTABLE_PATH ||
            '/usr/bin/chromium',

        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-sync',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]

    }

});


// QR LOGIN
client.on('qr', (qr) => {

    console.log('📱 Scan WhatsApp QR Code:');

    qrcode.generate(qr, {
        small: true
    });

});


// AUTH SUCCESS
client.on('authenticated', () => {

    console.log('✅ WhatsApp authenticated');

});


// READY
client.on('ready', () => {

    console.log('🚀 WhatsApp AI Bot is ready!');

});


// AUTH ERROR
client.on('auth_failure', (error) => {

    console.error('❌ WhatsApp authentication failed:', error);

});


// MESSAGE HANDLER
client.on('message_create', async (message) => {

    try {

        await handleMessage(client, message);

    } catch (error) {

        console.error(
            '❌ Message handler error:',
            error
        );

    }

});


// DISCONNECT AUTO RESTART
client.on('disconnected', (reason) => {

    console.log(
        '❌ WhatsApp disconnected:',
        reason
    );


    setTimeout(() => {

        console.log(
            '🔄 Reconnecting WhatsApp...'
        );

        client.initialize();

    }, 10000);

});


// START BOT
(async () => {

    try {

        console.log('⏳ Starting WhatsApp client...');

        await client.initialize();

    } catch (error) {

        console.error(
            '❌ WhatsApp startup error:',
            error
        );

        process.exit(1);

    }

})();