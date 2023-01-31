import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

export default ({errorNumber, errorText}) => {
    
	return Handlebars.compile(tpl)({errorNumber, errorText});
}
