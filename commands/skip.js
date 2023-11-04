const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'skip',
    description: 'Skip the current track.',
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      return message.reply('I am not currently in a voice channel in this server.');
    }

    if (!player.isPlaying) {
      return message.reply('There is no track currently playing.');
    }

    player.stop();

    message.reply('Skipped the current track.');
  },
};
