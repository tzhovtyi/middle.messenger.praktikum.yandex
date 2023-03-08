import HTTPTransport from './htttp-transport';


const fakeURL = 'https://jsonplaceholder.typicode.com/posts';
const fakeData = {
    id: 101,
    title: 'foo',
    body: 'bar',
    userId: 1
};

describe('HTTPTransport',  ()=> {
    test('GET', async ()=> {
        const res = await new HTTPTransport().get(fakeURL+'/1');
        const data = JSON.parse(res.response);
        expect(data.id).toBe(1);
    });
    test('PUT', async ()=> {
        const res = await new HTTPTransport().put(fakeURL+'/1', {data: fakeData});
        expect(res.status).toBe(200);
    });
    test('POST', async ()=> {
        const res = await new HTTPTransport().post(fakeURL, {data: fakeData});
        expect(res.status).toBe(201);
    });
    test('DELETE', async ()=> {
        const res = await new HTTPTransport().delete(fakeURL+'/1');
        expect(res.status).toBe(200);
    });
});
