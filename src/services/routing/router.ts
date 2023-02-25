import Block from '../block';
import Route from './route';
import store from '../store';

class Router {
    private _routes: Array<Route>;
    private _history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;

    constructor(rootQuery = '#root') {
        this._routes = [];
        this._history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
    }

    use(pathname: string, block: ()=>Block) {
        const route = new Route(pathname, block, this._rootQuery);
        this._routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route || this._currentRoute === route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this._history.back();
    }

    forward() {
        this._history.forward();
    }

    getRoute(pathname: string) {
        const user = store.getState().user;
        //send unauthorized users to login page
        if (!(pathname === '/' || pathname === '/sign-up') && !user) {
            this.go('/');
            return;
        //send authorized users to chat page
        } else if((pathname === '/' || pathname === '/sign-up') && user) {
            this.go('/messenger');
            return;
        }
        const route = this._routes.find(route => route.match(pathname));
        //return 404 page if the route doesn't exist,
        //BUT leave the url as they put it, so they can check the mistake in it
        return route ? route : this._routes.find(route => route.match('/404'));
    }
}
export default new Router();
