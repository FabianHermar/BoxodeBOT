/* eslint-disable */

import { Client, Events } from 'discord.js'
import 'dotenv/config'

const client = new Client( {
  intents: 3276799
} )

// Cuando el cliente esté listo, ejecuta este código
client.on( Events.ClientReady, async () => {
  console.log( `Logged in as ${client.user.username}!` )
} )

// Responder a los mensajes
client.on( Events.MessageCreate, async ( message ) => {
  // Ignorar mensajes de bots
  if ( message.author.bot ) return
  if ( !message.content.startsWith( '-' ) ) return

  const args = message.content.slice( 1 ).split( ' ' )[ 0 ]

  // Manejar el mensaje
  try {
    const command = await import( `../commands/${args}.js` )
    command.default.run( message )
  } catch ( error ) {
    console.log( `Ha ocurrido un error al usar el comando -${args}`, error.message )
  }
} )

// Iniciar sesión en Discord con el token del cliente
client.login( process.env.DISCORD_TOKEN )
