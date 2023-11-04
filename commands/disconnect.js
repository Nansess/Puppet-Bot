module.exports = {
    data: {
      name: 'disconnect',
      description: 'Disconnect the music player from the voice channel.',
      voiceChannelRequired: true,
    },
    async run(client, message, args) {
      const player = client.poru.players.get(message.guild.id);
  
      if (!player) {
        message.reply('There is no music player in this server.');
        return;
      }
  
      player.destroy();
      return message.reply('Disconnected the player.');
    },
  };
  