import { Message, Whatsapp } from "venom-bot";

export interface ICommand {
    canHandle(message: Message): boolean;
    handle(client: Whatsapp, message: Message): void;
}
