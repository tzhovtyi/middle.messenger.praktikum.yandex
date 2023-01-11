import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';

export default ({}) => {
	return Handlebars.compile(tpl)({});
}
