import { plainToInstance } from "class-transformer";
import { SearchResult } from "../model/search-result";

export class BuscaFatos {
    static urlBuscaFatosApi = process.env.URL_BUSCA_FATOS;

    static async search(message: string): Promise<string> {
        console.info(`Pesquisando por: ${message}`);

        const response = await fetch(`${this.urlBuscaFatosApi}/v1/search/${message}?raw=0`, {
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

        return reply;
    }
}
