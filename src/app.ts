import 'reflect-metadata';
import { create } from '@wppconnect-team/wppconnect';
import { onIncomingCall } from './call';
import { onStateChange } from './state';
import { CommandDispatcher } from './command/command-dispatcher';
import { puppeteerConfig } from './config/puppeteer.config';

async function bootstrap() {
    const client = await create({
        session: `${process.env.INSTANCE_ID}`,
        browserArgs: puppeteerConfig,
        disableWelcome: true,
        headless: true,
        logQR: false,
        catchQR: (qrCode, asciiQR, attempt, urlCode) => {
            if (process.env.REVERSE_QRCODE)
                console.log(asciiQR.split('\n').reverse().join('\n'));
            else
                console.log(asciiQR);
        }
    });

    // Catch ctrl+C
    process.on('SIGINT', () => {
        console.log('Aplicação forçada a fechar. Encerrando a sessão.');
        client.close();
    });

    client.onMessage(message => CommandDispatcher.dispatch(client, message));
    client.onIncomingCall(call => onIncomingCall(client, call));
    client.onStateChange(state => onStateChange(client, state));
}

bootstrap();
