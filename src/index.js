/* eslint-disable */

import { Client, Events } from 'discord.js';
import 'dotenv/config';
import { createServer } from 'http';

const client = new Client( {
  intents: 3276799
} )

// Cuando el cliente esté listo, ejecuta este código
client.on( Events.ClientReady, async () => {
  console.log( `Logged in as ${client.user.username}!` )

  // Configurar el estado y actividad personalizados
  client.user.setPresence( {
    status: 'online',
    activities: [ {
      name: 'Managing the server 👷‍♂️',
      type: 'PLAYING'
    } ]
  } );

  client.user.setActivity( "my code", { type: "STREAMING", url: "https://www.twitch.tv/an_idiots_guide" } )

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

// Esto es solo para Render, no afecta el funcionamiento del bot
const PORT = process.env.PORT || 3000;

createServer( ( req, res ) => res.end( 'Bot is running!' ) ).listen( PORT );
