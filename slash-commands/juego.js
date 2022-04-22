const htmlParse = require('../utils/remove-html-tags.js')

const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

let name = 'juego'
let description = 'Muestra informacion sobre un juego de Steam.'
module.exports = {
    name: name,
    description: description,
    slash: new SlashCommandBuilder()
        .setName(name)
        .setDescription(description)
        .addNumberOption(option => 
            option
            .setName('appid')
            .setDescription('AppID del juego. (use /buscar para encontrar el id)')
            .setRequired(true)),
    run(client, interaction) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        })

        const args = interaction.options.data
        const game = client.steam.getGameDetails(args[0].value, false, 'es-AR')
        .then(async data => {
            genres = [] //Categorias del juego
            
            if (data.genres) {
                data.genres.forEach(genre => {
                    genres.push(genre.description)}
                )
            }

            var gameDetails = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(data.name) //Nombre del Juego
            .setTimestamp()
            .setDescription(data.short_description) //Descripcion del juego
            .addField('Precio', data.is_free ? 'Gratis' : `${formatter.format(data.price_overview.final/100)} (Precio original: ${formatter.format(data.price_overview.initial/100)})`) //Precio inicial
            .addField('Precio con impuestos', data.is_free ? '-' : formatter.format(data.price_overview.final/100 * client.taxes)) //Precio con impuestos
            .addField('Fecha de salida', data.release_date ? data.release_date.date : '-')
            .addField('Cantidad de logros', data.achievements ? data.achievements.total.toString() : '0')
            .addField('Categorias', genres.length ? genres.join(', ') : '-')
            .addField('Numero de Jugadores', (await client.steam.getGamePlayers(args[0].value)).toString())
            .addField('Requisitos minimos', data.pc_requirements.minimum ? htmlParse.ReplaceHTMLTags(data.pc_requirements.minimum).split('\n').slice(1).join('\n') : 'No se especificaron los requisitos', inline=true) // Elimina tags html y los titulos
            .addField('Requisitos recomendados', data.pc_requirements.recommended ? htmlParse.ReplaceHTMLTags(data.pc_requirements.recommended).split('\n').slice(1).join('\n') : 'No se especificaron los requisitos', inline=true) // Elimina tags html y los titulos
            .setImage(data.header_image) //Imagen del juego

            interaction.reply({ embeds: [gameDetails] })
        })
        .catch(err => {
            interaction.reply(`No se encontro ningun juego con **AppID: ${args[0].value}**`)
        })
    }
}