import { textos } from "../messages/messages";
import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { ICommand } from "./command.interface";

export class AjudaCommand implements ICommand {
    canHandle(message: Message) {
        const selfTag = `@${message.to.substring(0, message.to.indexOf('@'))}`;
        const individualHelp = !message.isGroupMsg && message.body.startsWith('/ajuda');
        const groupHelp = message.mentionedJidList.includes(message.to) &&
            message.body.startsWith(`${selfTag} /ajuda`);

        return individualHelp || groupHelp;
    }

    async handle(client: Whatsapp, message: Message) {
        console.debug(`[AjudaCommand]:: handle(isGroup: ${message.isGroupMsg}, isForwarded: ${message.isForwarded}, isMedia: ${message.isMedia}, isMMS: ${message.isMMS})`);

        await client.sendText(message.from, textos.ajuda1, { linkPreview: true });
        await client.sendText(message.from, textos.ajuda2);
    }
}
