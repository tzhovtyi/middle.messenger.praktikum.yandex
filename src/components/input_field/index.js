import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

Handlebars.registerPartial('inputField', tpl);

export default (label, id, name, inputType = 'text') => {
	return Handlebars.compile(tpl)(label, id, name, inputType);
}
