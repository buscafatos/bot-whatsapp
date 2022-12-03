import { Whatsapp, Message } from '@wppconnect-team/wppconnect';
import { AjudaCommand } from "./ajuda";
import { BuscaGrupoCommand } from "./busca-grupo";
import { BuscaIndividualCommand } from "./busca-individual";
import { ICommand } from "./command.interface";

export class CommandDispatcher {
    static commands: ICommand[] = [
        new AjudaCommand(),
        new BuscaIndividualCommand(),
        new BuscaGrupoCommand(),
    ];

    static dispatch(client: Whatsapp, message: Message) {
        this.commands
            .filter(cmd => cmd.canHandle(message))
            .forEach(handler => handler.handle(client, message));
    }
}
