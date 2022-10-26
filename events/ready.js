const client = require('../index'),
  db = require('../core/db.js'),
  { bot } = require('../core/settings.js'),
  chalk = require('chalk');

function logAscii(bot, mode) {
  const x = `\n{!} :: Logged in as ${bot}\n{!} :: Made by SAI_xD 69#8377\n\n`
  console.log(`${x}`)
}
module.exports = async (client) => {

client.once("ready", async () => {
  client.user.setPresence({
    activities: [{
    name: `-help | Best Antinuke Bot ?? `,
    type: `LISTENING`
  }], status: `online` 
  });
  logAscii(client.user.tag);
});
}