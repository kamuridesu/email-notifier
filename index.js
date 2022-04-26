const notifier = require('mail-notifier');
const {Telegraf} = require('telegraf');
const fs = require('fs');
const TOKENS = JSON.parse(fs.readFileSync("./tokens.json"));
const BOT_TOKEN = TOKENS.TELEGRAM_TOKEN;
const passwd = TOKENS.EMAIL_PASSWD;
const bot = new Telegraf(BOT_TOKEN);
const ID = TOKENS.TELEGRAM_ID;


const imap = {
  user: 'luiz.k.amorim@gmail.com',
  password: passwd,
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

const n = notifier(imap);
n.on('end', () => n.start()) // session closed
  .on('mail', mail => {
    console.log(mail.subject);
    bot.telegram.sendMessage(ID,`⚠️ Novo Alerta ⚠️ \n ${mail.subject}`)
  })
  .start();
