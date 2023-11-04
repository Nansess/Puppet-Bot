const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'shufflequeue',
    description: 'Shuffle the queue.',
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    if (player.queue.length <= 2) {
      const cantShuffle = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription("Queue is too short");
      return message.reply({ embeds: [cantShuffle] });
    }

    if (player.queue.length <= 0) {
      const queueEmpty = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('The queue is already empty.');
      return message.reply({ embeds: [queueEmpty] });
    }

    player.queue.shuffle();

    const shuffled = new MessageEmbed()
      .setColor('GREEN')
      .setDescription('Shuffled the queue.');
    message.reply({ embeds: [shuffled] });
  },
};
