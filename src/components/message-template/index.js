import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

Handlebars.registerPartial('messageTemplate', tpl);

export default (content, timestamp, fromViewer) => {
	return Handlebars.compile(tpl)({content, timestamp, fromViewer});
}
