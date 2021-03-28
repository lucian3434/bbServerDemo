const Eris = require("eris");
const config = require("./config.json");
const cmd = require("./cmd.js");

const bot = new Eris(config.token);

bot.on("ready", () => {
  bot.createMessage(config.loggingChannel, {
    "embed": {
      "title": "Bot Ready!",
      "color": 8445695,
      "timestamp": new Date()
    }
  })
})

bot.on("messageCreate", (msg) => {
  let args = msg.content.split(/\s+/gm);
  if (args.length >= 1 && args[0].slice(0, 1) == "!" && msg.guildID == config.allowedServer) {
    let command = args[0].slice(1).toLowerCase();
    switch (command) {
      // help command
      case "help":
        // comedic multiline strings
        msg.channel.createMessage({
          "embed": {
            "title": "Commands:",
            "description": `**geninv** - Generates a sample inventory on the current "server"
**showinv** - shows your inventory on the current "server"
**toggleglobal** - toggles between local and global inventories (def)
**remember** - toggles whether or not inventories are cleared on leaving a "server" (default forget)`,
            "timestamp": new Date()
          }
        });
        break;

      // bog standard ping command
      case "ping":
        cmd.ping(msg);
        break;

      // generate a random inventory for the user
      case "geninv":
        cmd.geninv(msg, null);
        break;

      // show the players inventory
      case "showinv":
        cmd.showinv(msg, null);
        break;

      // --admin commands--
      // basic stop
      case "stop":
        if (msg.author.id == config.admin) {
          bot.disconnect();
        }
        break;
    }
  }
})

bot.connect();



const logAction = function(server, content) {
  bot.createMessage(config.loggingChannel, {
    "embed": {
      "title": `Action - ${server}`,
      "color": 16768000,
      "description": content,
      "timestamp": new Date()
    }
  });
}
