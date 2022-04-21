const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ayuda',
    description: 'Muestra una lista de comandos disponibles.',
    run(client, msg, args) {
        var helpEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Comandos')
        .setTimestamp()

        client.commands.forEach(command => {
            helpEmbed.addField(command.name, command.description)
        });

        msg.channel.send({ embeds: [helpEmbed] })
    }
}