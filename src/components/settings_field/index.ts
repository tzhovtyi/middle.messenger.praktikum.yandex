import tpl from './tpl';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { withProfileInfo } from '../../services/store/connect';

class SettingsField extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'settings__field');
        if (!this._props.type) {
            this._props.type = 'text';
        }
    }
    render() {
        return this.compile(tpl);
    }
}

const SettingsFieldConnected = withProfileInfo(SettingsField);
export default SettingsFieldConnected;
