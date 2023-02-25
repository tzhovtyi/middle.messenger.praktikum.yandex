import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { withAvatarURL } from '../../services/store/connect';


class ProfileSettingsLink extends Block {
    constructor(tag = 'form', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'chat__profile-settings-link');
    }
    render() {
        return this.compile(tpl);
    }
}

export default withAvatarURL(ProfileSettingsLink);
