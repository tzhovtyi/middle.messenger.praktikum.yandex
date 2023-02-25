import { ValidationRegex, stringsObject } from './types';
class FormValidator {
    private _form: HTMLFormElement;
    private _validationRegex: ValidationRegex = {
        first_name: /^[A-ZА-Я][a-zа-я-]+$/,
        second_name: /^[A-ZА-Я][a-zа-я]+$/,
        login: /^(?![0-9]+$)[A-Za-z0-9-_]{3,20}$/,
        email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
        phone: /^\+?\d{10,15}$/,
        display_name: /^[A-Za-z0-9А-Яа-я_\s-]{3,20}$/
    };
    private _invalidInputMessages: stringsObject = {
        first_name: 'Без пробелов, цифр и спецсимволов(кроме дефиса), первая буква должна быть заглавной',
        second_name: 'Без пробелов, цифр и спецсимволов(кроме дефиса), первая буква должна быть заглавной',
        password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        password_repeated: 'Пароли не совпадают',
        phone: 'Некорректный номер телефона',
        email: 'Некорректный email',
        login: 'От 3 до 20 символов, латиница, без пробелов, допустимы дефис и нижнее подчёркивание.',
        display_name: 'От 3 до 20 символов',
        empty: 'Пожалуйста, заполните поле'
    };

    public validateField(field: HTMLInputElement): boolean {
        const dataName:string = field.name;
        if(!this.isNotEmpty(field)) {
            this._setErrorMessage(field, this._invalidInputMessages.empty);
            return false;
        }
        let valid: boolean;
        if (dataName == 'password_repeated') {
            //password entered the 2nd time, checked without regex
            //get the 1st password without 'this' to use separately in blur events
            const firstPassword = field.form!.elements.namedItem('password') as HTMLInputElement;
            valid = firstPassword.value === field.value;
        } else {
            const regex = this._validationRegex[dataName] || this._validationRegex.password;
            valid = regex.test(field.value);
        }

        if (valid) {
            this._setErrorMessage(field, '');
            return true;
        } else {
            this._setErrorMessage(field, this._invalidInputMessages[dataName] || this._invalidInputMessages.password );
            return false;
        }
    }

    public isNotEmpty(field: HTMLTextAreaElement | HTMLInputElement ): boolean {
        return field.value !== '';
    }

    private _setErrorMessage(field: HTMLInputElement, mes: string) {
        const errorDiv: HTMLElement = field.parentElement!.querySelector(`#error-${field.name}`)!
        || document.querySelector(`#error-${field.name}`)!;
        errorDiv.innerText = mes;
    }

    public validateSubmit(event: Event): boolean {
        event.preventDefault();
        this._form = event.target as HTMLFormElement;

        const fields = Array.from(this._form.elements).filter(
            element => element.tagName === 'INPUT'
        ) as HTMLInputElement[];
        let allValid = true;
        //iterates until the end to show all user mistakes
        fields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });
        return allValid;
    }
}

const validator = new FormValidator();
export default validator;
