import { Message } from '@wppconnect-team/wppconnect';

export function isSelfTagged(message: Message): boolean {
    const selfTag = `@${message.to.substring(0, message.to.indexOf('@'))}`;

    return message.mentionedJidList.includes(message.to) && message.body.startsWith(selfTag);
}
