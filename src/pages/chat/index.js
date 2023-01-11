import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import sidebarDialogue from '../../components/sidebar-dialogue/';
import messageTemplate from "../../components/message-template/";
import { messages } from '../../mockData';
import { dialogues } from '../../mockData';

export default (props = {}) => {
	return Handlebars.compile(tpl)({messages, dialogues})
}
