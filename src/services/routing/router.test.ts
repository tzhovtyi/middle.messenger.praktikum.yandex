import router from './router';
import createLogInPage from '../../pages/login/';
import createRegistrationPage from '../../pages/registration/';
import createChatPage from '../../pages/chat/';

describe('Router', () => {

    beforeEach(() => {
        document.body.innerHTML =
        '<main id = "root">' +
        '</main>';
        router
            .use('/', createLogInPage)
            .use('/sign-up', createRegistrationPage)
            .use('/messenger', createChatPage)
            .start();
        router.go('/');
    });

    test('renders page in dom', ()=> {
        router.go('/sign-up');
        expect(window.location.pathname).toBe('/sign-up');
        expect(document.querySelector('.registration')).toBeTruthy();
    });

    test('history back', ()=> {
        window.history.back = jest.fn();
        router.go('/sign-up');
        router.back();
        expect(window.history.back).toBeCalledTimes(1);
    });

    test('history forward', ()=> {
        window.history.forward = jest.fn();
        router.go('/sign-up');
        router.back();
        router.forward();
        expect(window.history.forward).toBeCalledTimes(1);
    });

    test('sends unathorized users to login', ()=> {
        router.go('/sign-up');
        expect(window.location.pathname).toBe('/sign-up');
        router.go('/messenger');
        expect(window.location.pathname).toBe('/');
    });
});
