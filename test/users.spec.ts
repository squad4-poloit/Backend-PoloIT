import app from '../src/app'
import request from 'supertest'

describe('GET /users',() => {

    test('Shoukd respond with a 200 status code', async() => {
      const response =  await request(app).get('/api/users').send();
      console.log(response.body);
      expect(response);
    })
})
