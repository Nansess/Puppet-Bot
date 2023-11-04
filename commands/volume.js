const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'volume',
    description: 'Set the volume of the bot.',
    voiceChannelRequired: true,
    insame: true
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    if (isNaN(args[0])) {
      const volumeNotNumber = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Volume must be a number.');
      return message.reply({ embeds: [volumeNotNumber] });
    }

    const volume = parseInt(args[0]);

    if (volume < 0 || volume > 100) {
      const volumeOutOfRange = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Volume must be between 0 and 100.');
      return message.reply({ embeds: [volumeOutOfRange] });
    }

    player.setVolume(volume);
    
    const volumeSet = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Volume has been set to **${volume}%**.`);
    message.reply({ embeds: [volumeSet] });
  },
};
