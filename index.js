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
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
};

const n = notifier(imap);
n.on('end', () => n.start())
  .on('mail', mail => {
    console.log(mail.subject);
    let from = mail.from
    let helper = []
    for(let f of from) {
      helper.push(`${f.name}: ${f.address}`);
    }

    let content = '';
    content += "Novo email: \n\n";
    content += `De: ${helper.join(', ')}\n`;
    content += `Assunto: ${mail.subject}\n\n`;
    content += `Mensagem:\n${mail.text}`;
    bot.telegram.sendMessage(ID, content);
  })
  .start();
