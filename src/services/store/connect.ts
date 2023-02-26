import store from '.';
import { BlockPropsAndChildren } from '../types';
import Block from '../block';
import { Indexed } from '../types';
import { StoreEvents } from '.';
import isEqual from '../../utils/is-equal';

function connect(mapStateToProps: (state: Indexed, origProps: BlockPropsAndChildren) => Indexed) {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(tag: string, props: BlockPropsAndChildren) {
                let state = mapStateToProps(store.getState(), props);
                super(tag, {...props, ...state});
                store.on(StoreEvents.EVENT_UPDATE, () => {
                    const newState = mapStateToProps(store.getState(), props);
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }
                    state = newState;
                });
            }
        };
    };
}

export const withAvatarURL = connect(state => {
    if (state.user && state.user.avatar) {
        return {
            avatarURL: state.user.avatar
        };
    } else {
        return {
            avatarURL: ''
        };
    }
});

export const withAvatarAndName = connect(state => {
    if (state.user) {
        return {
            avatarURL: state.user.avatar,
            name: state.user.first_name + ' ' + state.user.second_name
        };
    } else {
        return {
            avatarURL: '',
            name: ''
        };
    }
});

//Settings fields are mapped as components, so it's easier to get their values separately using IDs
export const withProfileInfo = connect((state, props) => {
    if (state.user) {
        const user = state.user;
        const fieldName = props.id as string;
        const val = user[fieldName];
        return {
            value: val,
        };
    }
    else {
        return {
            value: ''
        };
    }
});

export const withChats = connect(state => {
    return {
        chats: state.chats
    };
});

export const withUserSearch = connect(state => {
    return {
        searchResults: state.userSearchResults
    };
});

export const withCurrentChat = connect(state => {
    return {
        currentChat: state.currentChat
    };
});

export const withMessages = connect(state => {
    return {
        messages: state.messages
    };
});
