import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import InputField from '../../components/input_field';
import Button from '../../components/button/';
import Block from '../../services/block';
import validator from '../../services/formvalidator';
import { BlockPropsAndChildren } from '../../services/types';
import { renderData } from './renderData';
import authController from '../../services/controllers/auth-controller';
import router from '../../services/routing/router';


const singUpBtn = new Button('div', {
    btnType: 'submit',
    label: 'Зарегистрироваться'
});

const returnBtn = new Button('div', {
    label: 'Войти',
    btnType: 'button',
    btnClass: 'return-link',
    events: {
        click: ()=> {
            router.go('/');
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

class RegistrationPage extends Block {
    render() {
        return this.compile(tpl);
    }
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'registration');
    }
}

export default function createRegistrationPage() {
    return new RegistrationPage('div', {
        singUpBtn: singUpBtn,
        inputFields:inputFields,
        returnBtn: returnBtn,
        events: {
            submit: e => {
                if (validator.validateSubmit(e)) {
                    authController.signUp(e);
                }
            }
        }
    });
}
