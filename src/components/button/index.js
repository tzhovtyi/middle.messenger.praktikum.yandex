import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

export default (label, func) => {
	return Handlebars.compile(tpl)({label: label, func: func});
}
