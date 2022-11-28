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

    if (message.isGroupMsg && !message.mentionedJidList.includes(message.to)) return;

    if (message.isMedia || message.isMMS) {
        console.info('Rejeitando mensagem de mídia.');
        return sendText(client, message.from, 'Ainda não suporto esse tipo de mensagem :)');
    }

    if (message.isGroupMsg)
        return onMessageTextGroup(client, message);

    return onMessageTextPrivate(client, message);
}

async function onMessageTextPrivate(client: Whatsapp, message: Message): Promise<void> {
    const result = await BuscaFatos.search(message.body);

    return sendText(client, message.from, result);
}

async function onMessageTextGroup(client: Whatsapp, message: Message): Promise<void> {
    if (!message.quotedMsgObj && !message.body.startsWith(`@${message.to.substring(0, 13)}`)) return;

    let searchTerm;
    let replyId;

    if (message.quotedMsgObj) {
        const quotedMessage = await client.getMessageById(message.chat.lastReceivedKey._serialized);
        searchTerm = quotedMessage.body;
        replyId = quotedMessage.id;
    } else {
        searchTerm = message.body.substring(14).trim();
        replyId = message.id;
    }

    const result = await BuscaFatos.search(searchTerm);

    return reply(client, message.from, result, replyId);
}
