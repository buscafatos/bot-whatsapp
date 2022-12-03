import { BuscaFatos } from "../service/busca-fatos";
import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { ICommand } from "./command.interface";

export class BuscaIndividualCommand implements ICommand {
    canHandle(message: Message): boolean {
        return !message.isGroupMsg &&
            (message.body.startsWith('/busca') || !message.body.startsWith('/'));
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[BuscaIndividualCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

        const searchTerm = message.body.replace('/busca', '').trim();

        const result = await BuscaFatos.search(searchTerm);

        return client.sendText(message.from, result);
    }
}
