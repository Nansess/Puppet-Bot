const fs = require("fs");
const { client, prefix } = require("../config.js"); 


// Load event modules
console.log("Loading events...");
const eventFiles = fs.readdirSync("../events").filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`../events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`Event loaded: ${event.name}`);
}

require("../handlers/messageHandler.js")(client, prefix);
require('../handlers/poruEventHandler')(client);
require('../handlers/commandLoader');