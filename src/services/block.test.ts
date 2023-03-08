import Block from './block';
import Button from '../components/button';

describe('Block', ()=> {

    const tpl =
    '<span>{{prop1}}</span>' +
    '<div>{{prop2}}</div>' +
    '{{{prop3}}}';
    class TestComponent extends Block {
        render() {
            return this.compile(tpl);
        }
    }
    const comp = new TestComponent('div', {
        prop1: 'test',
        prop2: 11,
    }, 'test-class');

    test('component renders correctly', ()=> {
        const content = comp.getContent().outerHTML;
        expect(content).toBe(
            '<div class="test-class">' +
                '<span>test</span>' +
                '<div>11</div>' +
            '</div>'
        );
    });

    test('component re-renders', ()=> {
        comp.setProps({
            prop1: 'newValue'
        });
        const content = comp.getContent().outerHTML;
        expect(content).toBe(
            '<div class="test-class">' +
                '<span>newValue</span>' +
                '<div>11</div>' +
            '</div>'
        );
    });

    test('component processes events', ()=> {
        const mockFunc = jest.fn();
        comp.setProps({
            events: {
                click: ()=> {
                    mockFunc();
                }
            }
        });
        comp.getContent().click();
        expect(mockFunc).toBeCalledTimes(1);
    });

    test('components renders components passed as props', ()=> {
        const btn = new Button('div', {
            label: 'someButton',
            btnType: 'submit'
        });
        comp.setProps({
            prop3: btn
        });
        const content = comp.getContent().outerHTML;
        expect(content).toBe(
            '<div class="test-class">' +
                '<span>newValue</span>' +
                '<div>11</div>' +
                '<div class="">' +
                    '<button type="submit" class="btn-div">someButton</button>' +
                '</div>' +
            '</div>'
        );
    });

});
