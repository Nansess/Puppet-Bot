const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'pause',
    description: 'Pause the player.',
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    if (player.isPaused) {
      const alreadyPaused = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Player is already paused.');
      return message.reply({ embeds: [alreadyPaused] });
    }

    player.pause(true);

    const paused = new MessageEmbed()
      .setColor('GREEN')
      .setDescription('Paused the player.');
    message.reply({ embeds: [paused] });
  },
};
