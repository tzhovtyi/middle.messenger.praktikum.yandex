import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import sidebarDialogue from '../../components/sidebar-dialogue/';
import messageTemplate from "../../components/message-template/";

export default (props = {}) => {
    const messages = [
        {
            content: 'Вот он Ленин на портете, в рамке зелени густой, был он лучше всех на свете - и великий, и простой!',
            timestamp: '02:12',
            fromViewer: false
        },
        {
            content: 'Hi',
            timestamp: '12:12',
            fromViewer: false
        },
        {
            content: 'A bit longer message',
            timestamp: '22:32',
            fromViewer: false
        },
        {
            content: 'This is a very long message to be sure there is nothing wrong with the layout. If some were to say there is a message length that would wrong the layout, i would greet that with scepticism',
            timestamp: '05:47',
            fromViewer: false
        },
        {
            content: 'So... how are things?',
            timestamp: '14:12',
            fromViewer: true
        },
    ]
    const dialogues = [
        {
            user: {
                name: 'Данил',
                avatar: null
            },
            lastMessage: {
                    content: 'Вот он Ленин на портете, в рамке зелени густой, был он лучше всех на свете - и великий, и простой!',
                    timestamp: '02:12',
                    fromViewer: false
            },
            unreadMessagesCount: 4
        }
    ]
	return Handlebars.compile(tpl)({messages, dialogues})
}
