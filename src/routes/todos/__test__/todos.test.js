import request from 'supertest';
import app from 'app';
import { query } from 'services/database';
import { encode } from 'auth';

const TEST_EMAIL = 'test@email.com';
let userId;
let accessToken;
let todoId;
describe('Todos API', () => {

  beforeAll(async () => {
    const search = await query(`SELECT * FROM todosapp.users WHERE email = $1;`, [TEST_EMAIL]);
    if (search.rows.length > 0) {
      const userId = search.rows[0].id;
      await query(`DELETE FROM todosapp.todos WHERE user_id = $1;`, [userId]);
      await query(`DELETE FROM todosapp.users WHERE email = $1;`, [TEST_EMAIL]);
    }
    const result = await query(`INSERT INTO todosapp.users (email) VALUES ($1) RETURNING *;`, [TEST_EMAIL]);
    const user = result.rows[0];
    userId = user.id;
    accessToken = await encode({ email: user.email, userId: user.id });
  });

  afterAll(async () => {
    await query(`DELETE FROM todosapp.todos WHERE user_id = $1;`, [userId]);
    await query(`DELETE FROM todosapp.users WHERE email = $1;`, [TEST_EMAIL]);
    jest.clearAllMocks();  // Clear mocks after each test to avoid state leakage
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {

      const res = await addHeaders(request(app).post('/todos').send({ title: 'New Todo', description: 'New Description' }), accessToken);

      todoId = res.body.id;
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('description');
    });
  });

  describe('GET /todos', () => {
    it('should return a list of todos', async () => {
      const total = 1;

      const res = await addHeaders(request(app).get('/todos').query({ page: 1, limit: 10 }), accessToken);

      expect(res.status).toBe(200);
      expect(res.body.todos.length).toBe(total);
      expect(res.body.total).toBe(total);
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update an existing todo', async () => {
      const updatedTodo = { id: 1, title: 'Updated Todo', description: 'Updated Description', completed: false };

      const res = await addHeaders(request(app).put(`/todos/${todoId}`).send({ title: 'Updated Todo', description: 'Updated Description', completed: false }), accessToken);

      expect(res.status).toBe(200);
      expect(res.body.title).toEqual(updatedTodo.title);
      expect(res.body.description).toEqual(updatedTodo.description);
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete an existing todo', async () => {

      const res = await addHeaders(request(app).delete(`/todos/${todoId}`), accessToken);

      expect(res.status).toBe(204);
    });
  });
});

export const addHeaders = (request, accessToken) => request
  .set('Content-Type', 'application/json')
  .set('accesstoken', accessToken);