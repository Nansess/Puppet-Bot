const fs = require('fs');
const { client, prefix } = require('../config.js');
const Ascii = require('ascii-table');
const table = new Ascii('Poru Commands');
table.setHeading('Commands', 'Load status');

console.log('Loading commands...');
const commandFiles = fs.readdirSync('../commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  try {
    const command = require(`../commands/${file}`);
    client.commands.set(command.data.name, command); 
    table.addRow(file, '✅');
  } catch (error) {
    console.error(`Error while loading command: ${file}`);
    table.addRow(file, `❌ -> Error while loading command`);
  }
}

console.log(table.toString());
