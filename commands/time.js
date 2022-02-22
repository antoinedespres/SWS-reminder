const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription("Get the bot's current time"),
    async execute(interaction) {
        await interaction.reply(`Time is ${Date.now()}.`);
    },
};
