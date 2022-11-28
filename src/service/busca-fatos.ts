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

        console.info(`Encontrado(s) ${searchResult.totalResults} resultado(s).`);

        return this.formatMessage(searchResult);
    }

    private static formatMessage(searchResult: SearchResult) {
        let reply = `Busca: ${searchResult.searchTerms}\n`;
        reply += `Total de resultados: ${searchResult.totalResults}\n\n`;

        searchResult.items?.forEach(item => {
            reply += `${item.title}\n`;
            reply += `Link: ${item.link}\n`;
            reply += `Fonte: ${item.source}\n\n`;
        });
        return reply;
    }
}
