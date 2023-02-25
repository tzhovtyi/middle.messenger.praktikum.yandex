import { BlockPropsAndChildren } from './../../services/types.d';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import Button from '../../components/button';
import NewChatBtn from '../../components/new-chat-btn';
import NewChatMenu from '../../components/new-chat-menu';
import SidebarDialogues from '../../components/sidebar-dialogues';
import ChatActions from '../../components/chat-actions';
import UserAddMenu from '../../components/chat-add-user';
import UserRemoveMenu from '../../components/chat-remove-user';
import ProfileSettingsLink from '../../components/profile-settings-link';
import chatsController from '../../services/controllers/chats-controller';
import store from '../../services/store';
import { withCurrentChat } from '../../services/store/connect';
import validator from '../../services/formvalidator';
import router from '../../services/routing/router';
import userController from '../../services/controllers/user-controller';
import messagesController from '../../services/controllers/messages-controller';
import MessagesLent from '../../components/messages-lent';

function closeMenu(menu: Block) {
    menu.hide();
    //clear the state from user search results
    if (store.getState().userSearchResults.length) {
        store.setState('userSearchResults', []);
    }
}

const profileSettings = new ProfileSettingsLink('div', {
    events: {
        click: ()=> {
            router.go('/settings');
        }
    }
});

const userAddMenu = new UserAddMenu('div', {
    searchResults: [],
    events: {
        //finds user to add to the chat
        submit: e=> {
            e.preventDefault();
            userController.searchUser(e);
        },
        click: e=> {
            const target = e.target as HTMLElement;
            //closes the menu
            if(target === e.currentTarget) {
                closeMenu(userAddMenu);
                return;
            }
            //adds the chosen user to the chat
            if(target.className === 'add-user-search-result') {
                const userId = target.dataset.uid;
                if (!userId) {
                    return;
                }
                chatsController.addUsersToChat(userId);
                closeMenu(userAddMenu);
            }
        }
    }
});
userAddMenu.hide();

const userRemoveMenu = new UserRemoveMenu('div', {
    searchResults: [],
    events: {
        click: e=> {
            const target = e.target as HTMLElement;
            //closes the menu
            if(target === e.currentTarget) {
                closeMenu(userRemoveMenu);
                return;
            }
            if(target.className === 'add-user-search-result') {
                const userId = target.dataset.uid;
                if (!userId) {
                    return;
                }
                chatsController.removeUsersFromChat(userId);
                closeMenu(userRemoveMenu);
            }
        }
    }

});
userRemoveMenu.hide();

const openActionsBtn = new Button('div', {
    label: '',
    btnType: 'button',
    btnClass: 'chat-lent__head__settings-btn',
    events: {
        click: ()=> {
            if (actionsMenu._props.shown) {
                actionsMenu.hide();
                actionsMenu.setProps({shown: false});
            } else {
                actionsMenu.setProps({shown: true});
                actionsMenu.show();
            }
        }
    }
}, 'chat-lent__head__settings-btn_wrap');

const actionsMenu = new ChatActions('div', {
    events: {
        click: e=> {
            const action  = (e.target as HTMLButtonElement).name;
            if(!action) return;
            switch(action) {
            case 'addUser':
                userAddMenu.show();
                break;
            case 'removeUser':
                chatsController.getChatUsers();
                userRemoveMenu.show();
                break;
            case 'deleteChat':
                chatsController.deleteChat();
                break;
            }
        },
        change: e=> {
            const files = (e.target as HTMLInputElement).files;
            if(!files) return;
            const img = files[0];
            const formData = new FormData();
            formData.append('avatar', img);
            chatsController.changeChatAvatar(formData);
        }
    }
});
actionsMenu.hide();

const newChatBtn = new NewChatBtn('button', {
    events: {
        click: () => {
            dialogues.hide();
            newChatMenu.show();
        }
    }
});
const newChatMenu = new NewChatMenu('div', {
    events: {
        submit: e => {
            e.preventDefault();
            chatsController.createChat(e);
            newChatMenu.hide();
            dialogues.show();
        }
    }
});
newChatMenu.hide();

const dialogues = new SidebarDialogues('div', {
    chats: [],
    events: {
        click: e=> {
            const target = e.target as HTMLElement;
            const id = target.dataset.chatid as string;
            const title = target.dataset.chattitle as string;
            const avatar = target.dataset.chatavatar as string;
            chatsController.openChat(id, title, avatar);
        }
    }
});

const messages = new MessagesLent('div', {
    messages: null
});

class Chat extends Block {
    constructor(tag: string, props: BlockPropsAndChildren) {
        super(tag, props, 'chat');
        if (window.location.pathname === '/chat') {
            chatsController.getChats();
        }
    }
    render() {
        return this.compile(tpl);
    }
}
const ChatConnected = withCurrentChat(Chat);

export default function createChatPage() {
    return new ChatConnected('div', {
        dialogues: dialogues,
        newChatMenu:newChatMenu,
        messages: messages,
        profileSettings: profileSettings,
        newChatBtn: newChatBtn,
        actionsMenu: actionsMenu,
        openActionsBtn:openActionsBtn,
        userAddMenu: userAddMenu,
        userRemoveMenu: userRemoveMenu,
        currentChat: null,
        events: {
            click: e => {
                if ((e.target as HTMLButtonElement).name !== 'send-message') return;
                const messageField = document.querySelector('textarea');
                if (messageField && validator.isNotEmpty(messageField)) {
                    const content:string = messageField.value;
                    messagesController.sendMessage(content);
                    messageField.value = '';
                }
            }
        }
    });
}
