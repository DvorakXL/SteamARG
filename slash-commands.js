const { Client, Intents, Collection } = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const client = new Client(
    { intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ] 
})

//  Get data from .env config file
require('dotenv').config();
let { TOKEN, STEAMTOKEN } = process.env

const SteamAPI = require('steamapi')
const steam = new SteamAPI(STEAMTOKEN)

// Place your guild id here
const guildId = '621505053219487764';
const guild = client.guilds.cache.get(guildId)

client.slashCommands = new Collection()

const slashCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of slashCommands) {
    const command = require(`./commands/${file}`)

    //Set a new item in the collection
    client.slashCommands.set(command.name, command)
}

client.on('ready', () => {
    const slashCommands = client.slashCommands.map(command => command.slash.toJSON())
    client.guilds.cache.get("621505053219487764").commands.set(slashCommands)

    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName)
        if (!command) return
        command.slashRun(client, interaction)
    }
})

client.login(TOKEN)