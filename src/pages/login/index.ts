import tpl from 'bundle-text:./tpl.hbs';
import InputField from '../../components/input_field';
import Button from '../../components/button/';
import Block from '../../services/block';
import validator from '../../services/formvalidator';
import './style.scss';
import { BlockPropsAndChildren } from '../../services/types';
import { renderData } from './renderData';

const logInBtn = new Button('div', {
    btnType: 'submit',
    label: 'Войти'
});

const inputFields = renderData.map(data => {
    return new InputField('div',
        {...data,
            events: {
                //in the block logic, will be applied to/removed from the inputs directly
                focus: e=> {
                    validator.validateField(e.target as HTMLInputElement);
                },
                blur: e=> {
                    validator.validateField(e.target as HTMLInputElement);
                },
            }
        });
});

class LogInPage extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'registration');
    }
    render() {
        return this.compile(tpl);
    }
}

export default function createLoginPage() {
    return new LogInPage('div', {
        logInBtn: logInBtn,
        inputFields:inputFields,
        events: {
            //validates by regex first, no need to send invalid fields to the server
            submit: e => {
                validator.validateSubmit(e);
            }
        }
    });
}
