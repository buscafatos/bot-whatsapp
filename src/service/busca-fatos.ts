import { plainToInstance } from "class-transformer";
import { SearchResult } from "../model/search-result";

export class BuscaFatos {
    static urlBuscaFatosApi = process.env.URL_BUSCA_FATOS;

    static async search(message: string): Promise<string> {
        const start = new Date().getTime();

        const response = await fetch(`${this.urlBuscaFatosApi}/v1/search/${message}?raw=0`, {
            headers: {
                "accept": "application/json"
            }
        });

        const duration = (new Date().getTime() - start) / 1000;

        console.debug(`[API Busca Fatos]:: Request Status: ${response.status} ${response.statusText}`);
        console.debug(`[API Busca Fatos]:: Pesquisado por: "${message}"`);

        if (!response.ok) return 'Não consegui realizar a busca neste momento.';

        const searchResult = plainToInstance(SearchResult, await response.json());

        console.debug(`[API Busca Fatos]:: Encontrado(s) ${searchResult.totalResults}. Duração: ${duration}s`);

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
