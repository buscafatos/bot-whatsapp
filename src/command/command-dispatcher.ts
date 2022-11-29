import { Whatsapp, Message } from "venom-bot";
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
        if (message.fromMe) return;

        this.commands
            .filter(cmd => cmd.canHandle(message))
            .forEach(handler => handler.handle(client, message));
    }
}
