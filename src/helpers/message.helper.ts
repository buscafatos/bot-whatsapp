import { Whatsapp } from 'venom-bot';

export async function sendText(client: Whatsapp, to: string, message: string): Promise<void> {
    try {
        await client.sendText(to, message);
    } catch (error) {
        console.error(`Erro ao enviar a mensagem: ${JSON.stringify(error)}`);
    }
}

export async function sendLinkPreview(client: Whatsapp, to: string, link: string, message: string): Promise<void> {
    try {
        await client.sendLinkPreview(to, link,message);
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
