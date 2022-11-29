import { sendText } from "../helpers/message.helper";
import { BuscaFatos } from "../service/busca-fatos";
import { Message, Whatsapp } from "venom-bot";
import { ICommand } from "./command.interface";

export class BuscaIndividualCommand implements ICommand {
    canHandle(message: Message): boolean {
        return !message.isGroupMsg &&
            (message.body.startsWith('/busca') || !message.body.startsWith('/'));
    }

    async handle(client: Whatsapp, message: Message) {
        const searchTerm = message.body.replace('/busca', '').trim();

        const result = await BuscaFatos.search(searchTerm);

        return sendText(client, message.from, result);
    }
}
