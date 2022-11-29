import { textos } from "../messages/messages";
import { Message, Whatsapp } from "venom-bot";
import { ICommand } from "./command.interface";
import { sendLinkPreview, sendText } from "../helpers/message.helper";

export class AjudaCommand implements ICommand {
    canHandle(message: Message) {
        return !message.isGroupMsg && message.body.startsWith('/ajuda');
    }

    async handle(client: Whatsapp, message: Message) {
        console.info('AjudaCommand.handle() invoked');

        await sendLinkPreview(client, message.from, textos.linkBuscaFatos, textos.ajuda1);
        await sendText(client, message.from, textos.ajuda2);
    }
}
