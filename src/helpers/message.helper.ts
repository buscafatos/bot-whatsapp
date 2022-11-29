import { BuscaFatos } from '../service/busca-fatos';
import { Whatsapp, Message } from 'venom-bot';

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

async function onMessageTextPrivate(client: Whatsapp, message: Message): Promise<void> {
    const result = await BuscaFatos.search(message.body);

    return sendText(client, message.from, result);
}

async function onMessageTextGroup(client: Whatsapp, message: Message): Promise<void> {
    if (!message.quotedMsgObj && !message.body.startsWith(`@${message.to.substring(0, message.to.indexOf('@'))}`)) return;

    let searchTerm = message.body.substring(message.body.indexOf(' ')).trim();
    let replyId = message.id;

    if (message.quotedMsgObj) {
        const quotedMessage = await client.getMessageById(message.chat.lastReceivedKey._serialized);

        searchTerm = quotedMessage.body;
        replyId = quotedMessage.id;
    }

    const result = await BuscaFatos.search(searchTerm);

    return reply(client, message.chatId, result, replyId);
}
