import { textos } from "../messages/messages";
import { Message, Whatsapp } from "venom-bot";
import { ICommand } from "./command.interface";
import { sendLinkPreview, sendText } from "../helpers/message.helper";

export class AjudaCommand implements ICommand {
    canHandle(message: Message) {
        return !message.isGroupMsg && message.body.startsWith('/ajuda');
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[AjudaCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

        await sendLinkPreview(client, message.from, textos.linkBuscaFatos, textos.ajuda1);
        await sendText(client, message.from, textos.ajuda2);
    }
}
