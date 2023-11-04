const { Client, Intents } = require("discord.js");
const fs = require("fs");
const { Poru } = require("poru");
const { Spotify } = require("poru-spotify");
require("dotenv").config();
const config = require("./config.json");

const { clientID, clientSecret } = config.spotify;
const nodes = config.nodes;

const PoruOptions = {
  library: "discord.js",
  defaultPlatform: "ytsearch",
  plugins: [new Spotify({ clientID, clientSecret })]
};

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.commands = new Map();

const token = config.botToken;
const prefix = config.prefix;
const ownerID = config.ownerID;

client.login(token);

client.poru = new Poru(client, nodes, PoruOptions);

module.exports = { client, prefix, ownerID };
