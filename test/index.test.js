import supertest from 'supertest';
import  app from '../app';

const api = supertest(app)
console.log("😆👽🕳👨‍💻 🧬 ~ file: index.test.js ~ line 5 ~ api", api.get())

test('should first', () => { 
    api.get('/list')
    .expect(200)
})
