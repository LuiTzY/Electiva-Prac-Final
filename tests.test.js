const request = require('supertest');
const app = require('../app');

describe('Pruebas de API /tareas', () => {
  test('GET /tareas debería responder con código 200', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});