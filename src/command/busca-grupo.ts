import { reply } from "../helpers/whatsapp.helper";
import { BuscaFatos } from "../service/busca-fatos";
import { Message, Whatsapp } from "venom-bot";
import { ICommand } from './command.interface';
import { isSelfTagged } from "../helpers/message.helper";

export class BuscaGrupoCommand implements ICommand {
    canHandle(message: Message): boolean {
        return message.isGroupMsg && isSelfTagged(message);
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[BuscaGrupoCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

        let searchTerm = message.body.substring(message.body.indexOf(' ')).trim();
        let replyId = message.id;

        const quotedMessage = await client.returnReply(message) as Message;

        if (quotedMessage) {
            searchTerm = quotedMessage?.body;
            //TODO: resolver como fazer o reply de uma mensagem em grupo que foi citada
            //O id da mensagem citada não é retornado
            replyId = quotedMessage?.id;
        }

        const result = await BuscaFatos.search(searchTerm);

        return reply(client, message.chatId, result, replyId);
    }
}
