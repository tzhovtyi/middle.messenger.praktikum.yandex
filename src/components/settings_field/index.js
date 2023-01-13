import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

Handlebars.registerPartial('settingsField', tpl);

export default () => {
	return Handlebars.compile(tpl)();
}
