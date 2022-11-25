import { Whatsapp, SocketState } from 'venom-bot';

export function onStateChange(client: Whatsapp, state: SocketState) {
    console.log(`Status alterado: ${JSON.stringify(state)}`);
    // force whatsapp take over
    if ('CONFLICT'.includes(state)) client.useHere();
    // detect disconnect on whatsapp
    if ('UNPAIRED'.includes(state))
        console.log('Sessão encerrada pelo WhatsApp.');
}
