require('dotenv').config()
const { Expo } = require('expo-server-sdk')
// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
console.log(expo);

let pushToken =  {"data": "ExponentPushToken[8PMt0vHMvqC9RG9pSpoC_I]", "type": "expo"}
if (!Expo.isExpoPushToken(pushToken.data)) {
    console.error(`El token de notificación push ${pushToken} no es válido`);
    return
}

console.log('paso');
let messages = []
//     mensaje.push({
//     to: pushToken.data,
//     sound: 'default',
//     body: 'Esto es una notificación de prueba',
//     data: { withSome: 'data' },
// })
messages.push({
    to: pushToken.data,
    sound: 'default',
    body: 'te tenemos amenzado perro',
    data: { withSome: 'data' },
  })
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      console.log(tickets);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
})();
// let chunks = expo.chunkPushNotifications(mensaje)
// (async () => {
//     try {
//       let chunks = expo.chunkPushNotifications(mensaje);
//       let tickets = [];
  
//       for (let chunk of chunks) {
//         let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         tickets.push(...ticketChunk);
//       }
  
//       console.log('Notificaciones push enviadas:', tickets);
//     } catch (error) {
//       console.error('Error al enviar las notificaciones push:', error);
//     }
//   })();