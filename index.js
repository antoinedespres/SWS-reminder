const fs = require('fs');

// Require the necessary discord.js classes
const {Client, Collection, Intents} = require('discord.js');
const cron = require("cron");
//const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Login to Discord with your client's token
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

let job1 = new cron.CronJob('00 00 08 * * 1-2', () => {
    client.guilds.cache.forEach(guild => {
        try {
            guild.systemChannel.send('Good morning ! It is time to sign! :smile:')
        } catch(err) {
            console.log('Failed to send a message on guild ' + guild);
        }
    })
});

let job2 = new cron.CronJob('00 40 12 * * 1-2', () => {
    client.guilds.cache.forEach(guild => {
        try {
            guild.systemChannel.send('Good afternoon! It is time to sign! :smile:')
        } catch(err) {
            console.log('Failed to send a message on guild ' + guild);
        }
    })
});

let job3 = new cron.CronJob('00 10 16 * * 1-2', () => {
    client.guilds.cache.forEach(guild => {
        try {
            guild.systemChannel.send('It is time to use the Microsoft Teams form. Have a good evening!')
        } catch(err) {
            console.log('Failed to send a message on guild ' + guild);
        }
    })
});

job1.start()
job2.start()
job3.start()


client.login(process.env.SWS_DISCORD_TOKEN);