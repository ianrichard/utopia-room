import { createServer } from 'miragejs';
import testPage from './test-page';

createServer({
    routes() {
        this.timing = 0;
        this.namespace = '/api/';
        this.get('test-page', () => testPage)
    },
})