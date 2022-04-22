const { SlashCommandBuilder } = require('@discordjs/builders')

let name = 'ping'
let description = 'Ping? Pong!'
module.exports = {
    name: name,
    description: description,
    slash: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    run(client, interaction) {
        const delay = Math.abs(Date.now() - interaction.createdTimestamp)
        interaction.reply({ content:`🏓 La latencia es de ${delay}ms`, ephemeral: true })
    }
}