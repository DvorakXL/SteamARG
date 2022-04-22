const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

let name = 'ayuda'
let description = 'Muestra una lista de comandos disponibles.'
module.exports = {
    name: name,
    description: description,
    slash: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description),
    run(client, interaction) {
        var helpEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Comandos')
        .setTimestamp()

        client.slashCommands.forEach(command => {
            helpEmbed.addField(command.name, command.description)
        })

        interaction.reply({ embeds: [helpEmbed], ephemeral: true })
    }
}