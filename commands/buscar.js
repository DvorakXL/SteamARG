const Sorter = require('../utils/sort-alphabetical')

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'buscar',
    description: 'buscar [juego]. Muestra una lista de juegos con el nombre ingresado.',
    run(client, msg, args) {
        const argStr = args.join(' ');
        const games = client.steam.getAppList()
        .then(data => {
            var gameList = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Juegos con: ${argStr}`)
                .setTimestamp()

            matched = data.filter(game => game.name.toLowerCase().includes(argStr.toLowerCase()))
            Sorter.SortStringProperty(matched, 'name')
            matched.slice(0,15).forEach(match => {
                gameList.addField(match.name, `AppID: ${match.appid}`, inline=true)
            })

            gameList.setFooter({ text: `Pagina: 1 - ${1+Math.round(matched.length/15)}`})

            msg.channel.send({ embeds: [gameList] })
        })
        .catch(err => msg.channel.send('Especifique un juego'))
    }
}