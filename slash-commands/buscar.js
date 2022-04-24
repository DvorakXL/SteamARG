const Sorter = require('../utils/sort-alphabetical')

const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

let name = 'buscar'
let description = 'Muestra una lista de juegos con el nombre ingresado.'
module.exports = {
    name: name,
    description: description,
    slash: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description)
        .addStringOption(option => 
            option
            .setName('juego')
            .setDescription('Nombre del juego.')
            .setRequired(true))
        .addIntegerOption(option => 
            option
            .setName('pagina')
            .setDescription('Pagina de la busqueda.')),
    run(client, interaction) {
        let page
        const args = interaction.options.data
        const games = client.steam.getAppList()
        .then(data => {
            var gameList = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Juegos con: ${args[0].value}`)
                .setTimestamp()

            matched = data.filter(game => game.name.toLowerCase().includes(args[0].value.toLowerCase()))

            Sorter.SortStringProperty(matched, 'name')
            
            //Check if input was given anf if it's too large
            if ( !args[1] || args[1].value > Math.floor(matched.length/15) ) {
                page = 0
            } else {
                page = args[1].value
            }

            matched.slice(page * 15, (page * 15) + 15).forEach(match => {
                gameList.addField(match.name, `AppID: ${match.appid}`, inline=true)
            })

            gameList.setFooter({ text: `Pagina: ${page} - ${Math.floor(matched.length/15)}`})

            interaction.reply({ embeds: [gameList], ephemeral:true })
        })
        .catch(err => {
            interaction.reply({ content:`Error al buscar el juego`, ephemeral:true })
        })
    }
}