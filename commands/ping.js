module.exports = {
    name: 'ping',
    description: 'Ping? Pong!',
    run(client, msg, args) {
        const delay = Math.abs(Date.now() - msg.createdAt)
        msg.reply({ content:`🏓 La latencia es de ${delay}ms` })
    }
}