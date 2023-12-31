import { NotFoundException } from '../exceptions';
import { buildMeta, getPaginationOptions } from '../helpers/pagination.helper';
import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';
import { TodoModel } from '../model/todo.model';

/**
 * Create a new todo
 *
 * @param createTodoDto
 *
 * @returns todo
 */
export async function create(createTodoDto: CreateTodoDto) {
  return TodoModel.create(createTodoDto);
}

/**
 * Get all todos
 *
 * @returns todos
 */
export async function getAll() {
  return TodoModel.getAll();
}

/**
 * Get filtered todos
 *
 * @param queryTodoDto
 *
 * @returns todos
 */
export async function getFiltered(queryTodoDto: QueryTodoDto) {
  const { page, size } = queryTodoDto;

  const pageDetails = getPaginationOptions({ page, size });

  const projectsPromise = TodoModel.getFiltered({
    ...pageDetails,
    ...queryTodoDto,
  });
  const countPromise = TodoModel.countAll(queryTodoDto);

  const [projects, count] = await Promise.all([projectsPromise, countPromise]);

  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: projects,
    meta,
  };
}

/**
 * Get todo by id
 *
 * @param id
 *
 * @returns todo
 */
export async function getById(id: number) {
  const todo = await TodoModel.getById(id);

  if (!todo) throw new NotFoundException('Todo not found!');

  return todo;
}

/**
 * Update todo by id
 *
 * @param id
 * @param updateTodoDto
 *
 * @returns todo
 */
export async function update(id: number, updateTodoDto: UpdateTodoDto) {
  const todo = await TodoModel.update(id, updateTodoDto);

  if (!todo) throw new NotFoundException('Todo not found!');

  return todo;
}

/**
 * Update todo completed by id
 *
 * @param id
 * @param completed
 *
 * @returns todo
 */
export async function updateCompleted(
  id: number,
  completed: boolean,
  updatedBy: number
) {
  const todo = await TodoModel.updateCompleted(id, completed, updatedBy);

  if (!todo) throw new NotFoundException('Todo not found!');

  return todo;
}

/**
 * Delete todo by id
 *
 * @param id
 */
export async function remove(id: number) {
  const todo = await TodoModel.remove(id);

  if (!todo) throw new NotFoundException('Todo not found!');

  return todo;
}
