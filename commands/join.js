module.exports = {
    data: {
      name: 'join',
      description: 'Join your voice channel.',
      voiceChannelRequired: true,
    },
    async run(client, message, args) {
      const voiceChannel = message.member.voice.channel;
      const textChannelId = message.channel.id;
  
      const botVoiceChannel = message.guild.members.me.voice.channel;
  
      if (botVoiceChannel) {
        const alreadyJoinedEmbed = {
          color: 'YELLOW',
          description: 'Bot is already in a voice channel.',
        };
        message.reply({ embeds: [alreadyJoinedEmbed] });
      } else {
        const connection = client.poru.createConnection({
          guildId: message.guild.id,
          voiceChannel: voiceChannel.id,
          textChannel: textChannelId,
          deaf: true,
        });
  
        if (connection) {
          const joinedChannelEmbed = {
            color: 'GREEN',
            description: `Joined ${voiceChannel.toString()}. (Output locked to text channel: <#${textChannelId}>)`,
          };
          message.reply({ embeds: [joinedChannelEmbed] });
        } else {
          const joinErrorEmbed = {
            color: 'RED',
            description: 'An error occurred while trying to join the voice channel.',
          };
          message.reply({ embeds: [joinErrorEmbed] });
        }
      }
    },
  };
  