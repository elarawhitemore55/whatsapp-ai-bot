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
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]

    }

});