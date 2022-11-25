import { SearchResult } from 'model/search-result';
import { Whatsapp, Message } from 'venom-bot';

const urlBuscaFatosApi = process.env.URL_BUSCA_FATOS;

export async function sendText(client: Whatsapp, to: string, message: string): Promise<void> {
    try {
        await client.sendText(to, message);
    } catch (error) {
        console.error(`Erro ao enviar a mensagem: ${JSON.stringify(error)}`);
    }
}

export async function onMessage(client: Whatsapp, message: Message): Promise<void> {
    // if (message.isMedia || message.isMMS) {
    //     return await sendText(client, message.from, 'Ainda não suporto esse tipo de mensagem :)');
    // }

    if (!message.body) return;

    onMessageText(client, message);
}

async function onMessageText(client: Whatsapp, message: Message) {
    const response = await fetch(`${urlBuscaFatosApi}/v1/search${message.body}`, {
        headers: {
            "accept": "application/json"
        }
    });

    const searchResult = <SearchResult>await response.json();

    let reply = `${searchResult.count} ocorrência(s) encontrada(s)\n\n`;

    searchResult.items.forEach(item => {
        reply += `${item.htmlTitle}\n${item.link}`;
    });

    await sendText(client, message.from, reply);
}
