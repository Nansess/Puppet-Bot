const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'seek',
    description: 'Seek to a specific position in the current track.',
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    if (!player.currentTrack.isSeekable) {
      const notSeekable = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('This track is not seekable.');
      return message.reply({ embeds: [notSeekable] });
    }

    const seekTime = parseSeekTime(args[0]);

    if (seekTime === null) {
      const invalidTime = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Invalid seek time format. Use "s" for seconds or "m" for minutes, e.g., !seek 10s or !seek 5m.');
      return message.reply({ embeds: [invalidTime] });
    }

    player.seekTo(seekTime * 1000);

    const seekSuccess = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Seeked to ${args[0]}`);
    message.reply({ embeds: [seekSuccess] });
  },
};

function parseSeekTime(input) {
  const time = parseInt(input);
  if (isNaN(time)) return null;
  
  const unit = input.slice(-1).toLowerCase();
  if (unit === 's') {
    return time;
  } else if (unit === 'm') {
    return time * 60;
  } else {
    return null;
  }
}
