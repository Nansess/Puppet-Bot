module.exports = {
  data: {
    name: 'resume',
    description: 'Resume playback in the voice channel.',
    voiceChannelRequired: true,
  },
  async run(client, message, args) {
    const player = client.poru.players.get(message.guild.id);

    if (!player) {
      const noPlayerEmbed = {
        color: 'RED',
        description: 'There is no music player in this server.',
      };
      message.reply({ embeds: [noPlayerEmbed] });
      return;
    }

    if (!player.isPaused) {
      const notPausedEmbed = {
        color: 'YELLOW',
        description: 'The player is not paused.',
      };
      message.reply({ embeds: [notPausedEmbed] });
    } else {
      player.pause(false);
      const resumedEmbed = {
        color: 'GREEN',
        description: 'Resumed the player.',
      };
      message.reply({ embeds: [resumedEmbed] });
    }
  },
};
