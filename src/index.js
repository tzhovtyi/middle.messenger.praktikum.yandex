import './style.scss';
import createLogInPage from "./pages/login/"
import createRegistrationPage from "./pages/registration/"
import createSettingsPage from "./pages/settings/"
import createChatPage from "./pages/chat/"
import createErrorPage from "./pages/error/"


// Handlebars.registerHelper('stringifyFunc', function(fn) {
//     return new Handlebars.SafeString("(" + 
//                fn.toString().replace(/\"/g,"'") + ")()");
// });


const registration = createRegistrationPage({});
const settings = createSettingsPage({});
const login = createLogInPage({});
const chat = createChatPage({})
const error404 = createErrorPage({errorNumber: '404', errorText: 'Не туда попали'});
const error500 = createErrorPage({errorNumber: '500', errorText: 'Мы уже фиксим'});


const routes = [
    { path: '/', component: login },
    { path: '/registration', component: registration },
    { path: '/settings', component: settings },
    { path: '/chat', component: chat },
    { path: '/404', component: error404 },
    { path: '/500', component: error500 }
  ];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '';
const findComponentByPath = (path, routes) => routes.find(r => r.path === `/${path}`);


const router = () => {
    const path = parseLocation();
    console.log(path)
    const {component} = findComponentByPath(path, routes) || {component: error404}
    // const res = comp({
    //     page: component,
    // })
    document.getElementById('root').innerHTML = component;
  };

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
router();

