const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "voiceStateUpdate",
    execute(client, oldState, newState) {
        const oldVoice = oldState.channelId;

        if (client.user && oldVoice === client.user.id) {
            console.log(`Bot left the voice channel, destroying player...`);
            const player = client.manager.get(oldState.guild.id);
            if (player) {
                player.destroy();
            }

            const voiceChannel = oldState.guild.me.voice.channel;

            if (voiceChannel) {
                voiceChannel.leave();
            }
        }
    }
};
