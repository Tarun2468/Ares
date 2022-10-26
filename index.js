const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, WebhookClient, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });
const wait = require('wait');
const { Database } = require('quickmongo');
const settings = require('./core/settings');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1028007636156813353/cxqw0Iy2aV4-XbWHA8WG41w5Ez6y_TWjCvvTZFvakI1-GDUkG6sFZ-kmNgyx7p54Q6Pr' }); 
const phin = require('phin').unpromisified;
const chalk = require('chalk');
const { readdirSync } = require("fs");
const util = require('./handler/util.js');
const GiveawayManager = require("./handler/GiveawayManager");

clientlogin();

client.emoji = {
  'tick': '<:CyanTick:1027951432151879720>',
  'cross': '<:vbVoteCrossCyan:1027966735153905724>',
  'dot': '<a:c_dot4:1026889119667847249>',
  'giveaway': '<a:giveaway2:1027531088135991337>'
};

client.login('OTk3MTYwODc0MjA2ODI2NTg3.G433Ox.pkb6KnFx1UPWg-VH3DuHetszsPKdBg-FXmwUJY');

process.on("unhandledRejection", (reason, promise) => {
 web.send(`\`\`\`js\n${reason.stack}\`\`\``)
});

process.on("uncaughtException", (err) => {
 web.send(`\`\`\`js\n${err.stack}\`\`\``)
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  web.send(`\`\`\`js\n${err.stack}\`\`\``);
});

process.on('multipleResolves', (type, promise, reason) => {
  web.send(`\`\`\`js\n${reason.stack}\`\`\``);
});

async function clientlogin(){
  const db = new Database('mongodb+srv://Test_Bot:8851020767@test.idqc2xz.mongodb.net/?retryWrites=true&w=majority');
  db.connect();
  require(`./core/db.js`)
  await wait(5000);
  client.giveawaysManager = new GiveawayManager(client);
  client.commands = new Collection();
  client.slashCommands = new Collection();
  client.categories = readdirSync("./commands/");
  client.util = new util(client);
  client.db = db;
  client.color = '00e3ff';
  require("./database/connect")();
  
  readdirSync("./events/").forEach(file => {
      let eventName = file.split(".")[0];
      require(`./events/${file}`)(client);
      console.log(`[ EVENTS ] Client event named ${eventName} loaded`);
  });
  
  require("./handler")(client);
}
module.exports = client;