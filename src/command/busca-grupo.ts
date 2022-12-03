import { BuscaFatos } from "../service/busca-fatos";
import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { ICommand } from './command.interface';
import { isSelfTagged } from "../helpers/message.helper";

export class BuscaGrupoCommand implements ICommand {
    canHandle(message: Message): boolean {
        return message.isGroupMsg && isSelfTagged(message);
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[BuscaGrupoCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

        let searchTerm = message.body.substring(message.body.indexOf(' ')).trim(); //Remove the @tag from the message
        let replyTo = message.id;

        if (message.quotedMsgId) {
            const quotedMessage = await client.getMessageById(message.quotedMsgId);

            searchTerm = quotedMessage.body;
            replyTo = quotedMessage.id;
        }

        const result = await BuscaFatos.search(searchTerm);

        return client.sendText(message.chatId, result, { quotedMsg: replyTo });
    }
}
