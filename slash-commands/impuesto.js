const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

let name = 'impuesto'
let description = 'Le agrega los impuestos al valor que ingresaste.'
module.exports = {
    name: name,
    description: description,
    slash: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description)
        .addNumberOption(option => 
            option
            .setName('precio')
            .setDescription('Precio al cual agregarle los impuestos')
            .setRequired(true)),
    run(client, interaction) {
        const args = interaction.options.data
        const gameList = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`$${args[0].value} con impuesto agregado`)
            .addField('Precio original', `$${args[0].value}`)
            .addField('Precio con impuesto', `$${args[0].value * client.taxes}`)
            .setTimestamp()

        interaction.reply({ embeds: [gameList] })
    }
}