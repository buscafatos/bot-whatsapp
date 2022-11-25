import 'reflect-metadata';
import { create } from 'venom-bot';
import { onMessage } from './message';
import { onIncomingCall } from './call';
import { onStateChange } from './state';

async function bootstrap() {
    const client = await create({
        session: `${process.env.INSTANCE_ID}`,
        addBrowserArgs: ['--disable-dev-shm-usage'],
        disableSpins: true,
        headless: true,
    });

    // Catch ctrl+C
    process.on('SIGINT', () => {
        console.log('Aplicação forçada a fechar. Encerrando a sessão.');
        client.close();
    });

    client.onMessage(message => onMessage(client, message));
    client.onIncomingCall(call => onIncomingCall(client, call));
    client.onStateChange(state => onStateChange(client, state));
}

bootstrap();
