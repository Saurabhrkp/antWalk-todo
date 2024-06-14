import { createNewTodo, deleteTodoById, queryTodos, updateTodoById } from './service';

export const getTodos = async (req, res) => {
  const { userId } = res.locals;
  const { page = 1, limit = 10, search = '', sort_by = 'created_at', order = 'asc', completed } = req.query;
  const query = { page, limit, search, sort_by, order, completed };
  const result = await queryTodos(userId, query);
  return res.status(200).json(result);
};

export const createTodo = async (req, res) => {
  const { userId } = res.locals;
  const { title, description } = req.body;
  const body = { title, description };
  const result = await createNewTodo(userId, body);
  return res.status(201).json(result);
};

export const updateTodo = async (req, res) => {
  const { userId } = res.locals;
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const body = { id, title, description, completed };
  const result = await updateTodoById(userId, body);
  return res.status(200).json(result);
};

export const deleteTodo = async (req, res) => {
  const { userId } = res.locals;
  const { id } = req.params;
  await deleteTodoById(userId, id);
  return res.sendStatus(204);
};