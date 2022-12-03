import { Message, Whatsapp } from '@wppconnect-team/wppconnect';

export interface ICommand {
    canHandle(message: Message): boolean;
    handle(client: Whatsapp, message: Message): void;
}
