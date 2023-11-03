module.exports = (client, prefix) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.data.voiceChannelRequired && !message.member.voice.channel) {
      return message.reply({
        content: 'You need to be in a voice channel to use this command.',
        ephemeral: true,
      });
    }

    try {
      await command.run(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error while executing this command.");
    }
  });
};
