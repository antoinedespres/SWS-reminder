module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot is logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'processing signatures' }], status: 'online' });
    },
};