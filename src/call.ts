import { Whatsapp } from '@wppconnect-team/wppconnect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function onIncomingCall(client: Whatsapp, call: any) {
    console.log(`Recebendo ligação: ${JSON.stringify(call)}`);

    await client.sendText(call.peerJid, 'Desculpe, não sei falar. Me envie uma mensagem por texto.');
}
