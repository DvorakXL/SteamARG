const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'impuesto',
    description: `impuesto [saldo]. Le agrega los impuestos al valor que ingresaste.`,
    run(client, msg, args) {
        const gameList = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`$${args[0]} con impuesto agregado`)
            .addField('Precio original', `$${args[0]}`)
            .addField('Precio con impuesto', `$${(args[0] * client.taxes)}`)
            .setTimestamp()
        
        if (!args[0] || isNaN(args[0])) {
            msg.channel.send('Debes ingresar un valor numerico!')
        } else {
            msg.channel.send({ embeds: [gameList] })
        }
    }
}