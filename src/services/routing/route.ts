import Block from '../block';

export default class Route {
    private _pathname: string;
    private _blockConstructor: ()=> Block;
    private _block: Block | null;
    private _rootQuery: string;

    constructor(pathname: string, blockConstructor:()=> Block, rootQuery = '#root') {
        this._pathname = pathname;
        this._blockConstructor = blockConstructor;
        this._block = null;
        this._rootQuery = rootQuery;
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = this._blockConstructor();
            const root = document.querySelector(this._rootQuery);
            root!.appendChild(this._block.getContent());
            return;
        }
        this._block.show();
    }
}
