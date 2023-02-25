import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import MessageTemplate from '../../components/message-template/';
import SidebarDialogue from '../../components/sidebar-dialogue/';
import { messagesData } from '../../mockData';
import { dialoguesData } from '../../mockData';
import validator from '../../services/formvalidator';

const sidebarDialogues = dialoguesData.map((obj) => {
    return new SidebarDialogue('div', {
        user: obj.user,
        lastMessage: obj.lastMessage,
        unreadMessagesCount: obj.unreadMessagesCount
    });
});

const messages = messagesData.map((obj) => {
    return new MessageTemplate('div', {
        content: obj.content,
        timestamp: obj.timestamp,
        fromViewer: obj.fromViewer
    });
});

class Chat extends Block {
    render() {
        return this.compile(tpl);
    }
}

export default function createChatPage() {
    return new Chat('div', {
        dialogues: sidebarDialogues,
        messages: messages,
        events: {
            click: e => {
                if ((e.target as HTMLButtonElement).name !== 'send-message') return;
                const messageField = document.querySelector('textarea');
                if (messageField && validator.isNotEmpty(messageField)) {
                    const req = {message: messageField.value };
                    console.log('sending request:');
                    console.log(req);
                }

            }
        }
    }, 'chat');
}
