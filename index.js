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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.commands = new Collection()
client.steam = steam
client.taxes = config.steamTaxes

const commandsList = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandsList) {
    const command = require(`./commands/${file}`)

    //Set a new command to the collection
    client.commands.set(command.name, command)
}

client.on('messageCreate', msg => {
    if (msg.content.startsWith(config.prefix)) {
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return msg.channel.send("That command doesn't exist")
        command.run(client, msg, args)
    }
})

client.login(TOKEN)