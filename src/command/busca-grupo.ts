import { reply } from "../helpers/message.helper";
import { BuscaFatos } from "../service/busca-fatos";
import { Message, Whatsapp } from "venom-bot";
import { ICommand } from './command.interface';

export class BuscaGrupoCommand implements ICommand {
    canHandle(message: Message): boolean {
        return message.isGroupMsg &&
            message.mentionedJidList.includes(message.to) &&
            message.body.startsWith(`@${message.to.substring(0, message.to.indexOf('@'))}`);
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[BuscaGrupoCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

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
}
