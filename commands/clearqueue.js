const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'clearqueue',
    description: 'Clear the queue.',
    voiceChannelRequired: true,
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    if (player.queue.length <= 0) {
      const queueEmpty = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('The queue is already empty.');
      return message.reply({ embeds: [queueEmpty] });
    }

    player.queue.clear();

    const cleared = new MessageEmbed()
      .setColor('GREEN')
      .setDescription('Cleared the queue.');
    message.reply({ embeds: [cleared] });
  },
};
