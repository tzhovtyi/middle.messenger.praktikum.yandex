import './style.scss';
import createLogInPage from './pages/login/';
import createRegistrationPage from './pages/registration/';
import createSettingsPage from './pages/settings/';
import createChatPage from './pages/chat/';
import ErrorPage from './pages/error/';


const login = createLogInPage();
const registration = createRegistrationPage();
const settings = createSettingsPage();
const chat = createChatPage();

const error404 = new ErrorPage('div', {
    errorNumber: '404',
    errorText: 'Не туда попали'
});
const error500 = new ErrorPage('div', {
    errorNumber: '500',
    errorText: 'Уже фиксим'
});

const routes = [
    { path: '/', page: login },
    { path: '/registration', page: registration },
    { path: '/settings', page: settings },
    { path: '/chat', page: chat },
    { path: '/404', page: error404 },
    { path: '/500', page: error500 }
];

const router = () => {
    const path = location.hash.slice(1).toLowerCase() || '';
    const {page} = routes.find(r => r.path === `/${path}`) || {page: error404};
    document.getElementById('root')!.innerHTML = '';
    document.getElementById('root')!.appendChild(page.getContent());
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
router();
