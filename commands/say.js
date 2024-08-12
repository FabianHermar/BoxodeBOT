export default {
  description: 'Repite los argumentos que le pases',
  run: async (message) => {
    const args = message.content.split(' ').slice(1).join(' ')

    if (args.length < 1) return message.reply('Debes escribir algo para que te repita')

    await message.channel.send(args)

    await message.delete()
  }
}
