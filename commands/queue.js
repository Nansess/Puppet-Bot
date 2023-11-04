const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: {
    name: 'queue',
    description: 'Display the current queue.',
    voiceChannelRequired: true,
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      return message.reply('The bot is not currently in a voice channel.');
    }

    const queue = player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;
    const totalQueueCount = player.queue.length;

    const embed = new MessageEmbed()
      .setColor('WHITE')
      .setTitle('Queue')
      .setThumbnail(player.currentTrack.info.image)
      .setDescription(
        `[${player.currentTrack.info.title}](${player.currentTrack.info.uri}) [${ms(player.currentTrack.info.length)}]`
      );
    if (queue.length) {
      const queueDescription = queue
        .map((track, index) => `**${index + 1}.)** [${track.info.title}](${track.info.uri})`)
        .join('\n');

      embed.addFields({
        name: 'Up Next',
        value: queueDescription,
      });

      if (totalQueueCount > 9) {
        const moreSongs = totalQueueCount - 9;
        embed.addFields({ name: 'And More...', value: `There are ${moreSongs} more songs in the queue.` });
      }
    }

    message.channel.send({ embeds: [embed] });
  },
};
