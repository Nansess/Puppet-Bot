const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'play',
    description: 'Play a track in your voice channel.',
    voiceChannelRequired: true,
  },
  async run(client, message, args) {
    if (!message.member.voice.channel) {
      return message.reply({
        content: 'Please connect to a voice channel',
        ephemeral: true,
      });
    }

    const track = args.join(' ');

    if (!track) {
      const embed = new MessageEmbed()
        .setColor('#FF0000')  
        .setTitle('Error')
        .setDescription('You need to provide a query to search for a track.')
        .setFooter('Usage: /play <track query>');

      return message.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    const player = client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channelId,
      textChannel: message.channelId,
      deaf: true,
    });

    try {
      const resolve = await client.poru.resolve({
        query: track,
        source: 'ytsearch',
        requester: message.author,
      });

      const { loadType, tracks, playlistInfo } = resolve;

      if (loadType === 'PLAYLIST_LOADED') {
        for (const track of resolve.tracks) {
          track.info.requester = message.author;
          player.queue.add(track);
        }

        message.reply(`Added: \`${tracks.length} from ${playlistInfo.name}\``);
        if (!player.isPlaying && !player.isPaused) return player.play();
      } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
        const track = tracks.shift();
        track.info.requester = message.author;

        player.queue.add(track);
        message.reply(`Added: \`${track.info.title}\``);
        if (!player.isPlaying && !player.isPaused) return player.play();
      } else {
        message.reply('No matches found');
      }
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while processing your request.');
    }
  },
};
