import { query } from 'services/database';

export const queryTodos = async (user_id, queryData) => {
  const { page, limit, search, sort_by, order, completed } = queryData;

  const offset = (page - 1) * limit;

  let baseQuery = `SELECT * FROM todosapp.todos WHERE user_id = $1`;
  let countQuery = `SELECT COUNT(*) FROM todosapp.todos WHERE user_id = $1`;
  const queryParams = [user_id];
  let paramIndex = 2;

  if (search) {
    baseQuery += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    countQuery += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    queryParams.push(`%${search}%`);
    paramIndex++;
  }

  if (completed !== undefined) {
    baseQuery += ` AND completed = $${paramIndex}`;
    countQuery += ` AND completed = $${paramIndex}`;
    queryParams.push(completed === 'true' ? true : false);
    paramIndex++;
  }

  const countResult = await query(countQuery, [user_id, ...queryParams.slice(1)]);

  baseQuery += ` ORDER BY ${sort_by} ${order} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  queryParams.push(limit, offset);

  const todosResult = await query(baseQuery, queryParams);

  const total = parseInt(countResult.rows[0].count, 10);
  const todos = todosResult.rows;

  const result = { page: parseInt(page, 10), limit: parseInt(limit, 10), total, todos };
  return result;
};

export const createNewTodo = async (user_id, body) => {
  const { title, description } = body;

  const todos = await query(`SELECT * FROM todosapp.todos WHERE title = $1  AND user_id = $2;`, [title, user_id]);
  if (todos.rows.length > 0) throw new Error('No Record Found');

  const result = await query(
    `INSERT INTO todosapp.todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, title, description]
  );

  return result.rows[0];
};

export const updateTodoById = async (user_id, body) => {
  const { id, title, description, completed } = body;

  const todos = await query(`SELECT * FROM todosapp.todos WHERE  id = $1 AND user_id = $2;`, [id, user_id]);
  if (todos.rows.length === 0) throw new Error('No Record Found');

  const result = await query(
    `UPDATE todosapp.todos SET title = $1, description = $2, completed = $3, updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *`,
    [title, description, completed, id, user_id]
  );

  return result.rows[0];
};

export const deleteTodoById = async (user_id, id) => {
  const todos = await query(`SELECT * FROM todosapp.todos WHERE  id = $1 AND user_id = $2;`, [id, user_id]);
  if (todos.rows.length === 0) throw new Error('No Record Found');

  await query(`DELETE FROM todosapp.todos WHERE id = $1 AND user_id = $2`, [id, user_id]);
  return;
};