import './style.scss';
import createLogInPage from './pages/login/';
import createRegistrationPage from './pages/registration/';
import createSettingsPage from './pages/settings/';
import createChatPage from './pages/chat/';
import { createError404, createError500 } from './pages/error';
import router from './services/routing/router';
import store from './services/store';

router
    .use('/', createLogInPage)
    .use('/sign-up', createRegistrationPage)
    .use('/settings', createSettingsPage)
    .use('/messenger', createChatPage)
    .use('/404', createError404)
    .use('/500', createError500)
    .start();

store.setState('currentChat', null);
