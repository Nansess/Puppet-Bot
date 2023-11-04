const { MessageEmbed } = require('discord.js');

module.exports = (client, prefix) => {
  client.on('messageCreate', async (message) => {
    // Ignore bot, system, dm, and webhook messages
    if (message.author.bot || !message.guild || message.system || message.webhookId) return;

    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (commandName.length === 0) return;

      let command = client.commands.get(commandName);

      if (!command) command = client.commands.get(client.aliases.get(commandName));
      const player = client.poru.players.get(message.guild.id);
      const memberChannel = message.member.voice.channelId;
      const botChannel = message.guild.members.me.voice.channelId;

      if (!command) return;

      if (command.inVc && !memberChannel) {
        return message.channel.send('You must be in a Voice Channel to use this Command!');
      }

      if (command.sameVc && player && botChannel !== memberChannel) {
        return message.channel.send('You must be in the same Voice Channel as me!');
      }

      if (command.player && !player) {
        return message.channel.send('No player exists for this server.');
      }

      if (command.current && !player.currentTrack) {
        return message.channel.send('There is nothing playing right now.');
      }

      if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments.`);
      }

      if (command.data.voiceChannelRequired) {
        const botVoiceChannel = message.guild.members.me.voice.channel;
        const memberVoiceChannel = message.member.voice.channel;

        if (!botVoiceChannel) {
          if (memberVoiceChannel) {
            const connection = client.poru.createConnection({
              guildId: message.guild.id,
              voiceChannel: memberVoiceChannel.id,
              textChannel: message.channelId,
              deaf: true,
            });

            if (!connection) {
              const joinError = new MessageEmbed()
                .setColor('RED')
                .setDescription('An error occurred while trying to join the voice channel.');
              message.reply({ embeds: [joinError] });
            }
          } else {
            return message.reply({
              content: 'You need to be in a voice channel to use this command.',
              ephemeral: true,
            });
          }
        } else if (botVoiceChannel.id !== memberVoiceChannel.id) {
          const channelError = new MessageEmbed()
            .setColor('ORANGE')
            .setDescription('You need to be in the same voice channel as the bot to do this');
          return message.reply({ embeds: [channelError], ephemeral: true });
        }
      }

      try {
        await command.run(client, message, args);
      } catch (error) {
        console.error(error);
        const executionError = new MessageEmbed()
          .setColor('ORANGE')
          .setDescription('There was an error while executing this command.');
        message.reply({ embeds: [executionError] });
      }
    }
  });
};
