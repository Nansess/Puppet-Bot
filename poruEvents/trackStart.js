const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = (client, player, track) => {
  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setThumbnail(track.info.image)
    .setDescription(`**Now Playing**: [${track.info.title}](${track.info.uri})
Author: \`${track.info.author}\`          Source: \`${track.info.sourceName}\`
Duration: \`${ms(track.info.length)}\`          Requested by: \`${track.info.requester.tag}\``);

  const channel = client.channels.cache.get(player.textChannel);

  return channel?.send({ embeds: [embed] });
};
