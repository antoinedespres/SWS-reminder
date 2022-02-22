const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test bot latency'),
    async execute(interaction) {
        await interaction.reply(`🏓 Latency is ${Date.now() - interaction.createdTimestamp} ms.`);
    },
};
