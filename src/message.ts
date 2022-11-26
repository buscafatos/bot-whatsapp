import { Whatsapp, Message } from 'venom-bot';
import { BuscaFatos } from './service/busca-fatos';

export async function sendText(client: Whatsapp, to: string, message: string): Promise<void> {
    try {
        await client.sendText(to, message);
    } catch (error) {
        console.error(`Erro ao enviar a mensagem: ${JSON.stringify(error)}`);
    }
}

export async function reply(client: Whatsapp, to: string, message: string, quotedMessage: string): Promise<void> {
    try {
        await client.reply(to, message, quotedMessage);
    } catch (error) {
        console.error(`Erro ao responder a mensagem: ${JSON.stringify(error)}`);
    }
}

export async function onMessage(client: Whatsapp, message: Message): Promise<void> {
    if (!message.body) return;

    if (message.isMedia || message.isMMS) {
        console.log('Rejeitando mensagem de mídia.');
        return sendText(client, message.from, 'Ainda não suporto esse tipo de mensagem :)');
    }

    return onMessageText(client, message);
}

async function onMessageText(client: Whatsapp, message: Message): Promise<void> {
    const result = await BuscaFatos.search(message.body);

    if (message.isGroupMsg && message.mentionedJidList.includes(message.to)) {
        return reply(client, message.from, result, message.chat.lastReceivedKey._serialized);
    }

    return sendText(client, message.from, result);
}
