import { stringsObject } from '../services/types';

//gets all request values from form submit events

export default function getFormData(e: Event): unknown {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fields = Array.from(form.elements).filter(element =>
        element.tagName === 'INPUT') as HTMLInputElement[];
    const data: stringsObject = {};
    fields.forEach(field => {
        if(field.name !== 'password_repeated') {
            data[field.name] = field.value;
        }
    });
    return data;
}
