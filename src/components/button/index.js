import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
Handlebars.registerHelper('stringifyFunc', function(fn) {
    return new Handlebars.SafeString("(" + 
               fn.toString().replace(/\"/g,"'") + ")()");
});


export default (label, func) => {
	return Handlebars.compile(tpl)({label: label, func: func});
}
