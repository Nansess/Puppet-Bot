const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'move',
    description: 'Move songs within the queue.',
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noBotInVC = new MessageEmbed()
        .setColor('RED')
        .setDescription('The bot is not currently in a voice channel.');
      return message.reply({ embeds: [noBotInVC] });
    }

    const from = args[0] ? parseInt(args[0], 10) : null;
    const to = args[1] ? parseInt(args[1], 10) : null;

    if (from === null || to === null) {
      const invalidUsage = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Invalid usage.\n**Example:** /move 10 1');
      return message.reply({ embeds: [invalidUsage] });
    }

    if (
      from === to ||
      isNaN(from) ||
      from < 1 ||
      from > player.queue.length ||
      isNaN(to) ||
      to < 1 ||
      to > player.queue.length
    ) {
      const invalidTrack = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription("That track doesn't exist in the queue.");
      return message.reply({ embeds: [invalidTrack] });
    }

    const moved = player.queue[from - 1];
    moveArrayElement(player.queue, from - 1, to - 1);

    const moveSuccess = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Moved ${moved.info.title} to position \`${to}\`.`);
    message.reply({ embeds: [moveSuccess] });
  },
};

function moveArrayElement(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
