import tpl from 'bundle-text:./tpl.hbs';
import InputField from '../../components/input_field';
import Button from '../../components/button/';
import Block from '../../services/block';
import validator from '../../services/formvalidator';
import './style.scss';
import { BlockPropsAndChildren } from '../../services/types';
import { renderData } from './renderData';
import router from '../../services/routing/router';
import authController from '../../services/controllers/auth-controller';

const logInBtn = new Button('div', {
    btnType: 'submit',
    label: 'Войти'
});

const returnBtn = new Button('div', {
    label: 'Нет аккаунта?',
    btnType: 'button',
    btnClass: 'return-link',
    events: {
        click: ()=> {
            router.go('/sign-up');
        }
    }
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
        returnBtn: returnBtn,
        events: {
            submit: e => {
                if (validator.validateSubmit(e)) {
                    authController.signIn(e);
                }
            }
        }
    });
}
