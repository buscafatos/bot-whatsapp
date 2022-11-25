import { plainToInstance } from 'class-transformer';
import { SearchResult } from './model/search-result';
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
    if (!message.body) return;

    if (message.isGroupMsg) return;

    if (message.isMedia || message.isMMS) {
        console.log('Rejeitando mensagem de mídia.');
        return await sendText(client, message.from, 'Ainda não suporto esse tipo de mensagem :)');
    }

    onMessageText(client, message);
}

async function onMessageText(client: Whatsapp, message: Message) {
    console.info(`Pesquisando por: ${message.body}`);

    const response = await fetch(`${urlBuscaFatosApi}/v1/search/${message.body}?raw=0`, {
        headers: {
            "accept": "application/json"
        }
    });

    const searchResult = plainToInstance(SearchResult, await response.json());

    let reply = `${searchResult.items?.length} ocorrência(s) encontrada(s)\n\n`;

    searchResult.items?.forEach(item => {
        reply += `${item.title}\n${item.link}\n\n`;
    });

    console.info(`Resultado da pesquisa: ${reply}`);

    await sendText(client, message.from, reply);
}
