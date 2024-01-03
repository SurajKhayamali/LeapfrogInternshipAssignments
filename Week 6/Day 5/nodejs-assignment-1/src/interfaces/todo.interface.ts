export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdBy: number;
  updatedBy?: number;
}

export interface CreateTodoDto extends Omit<Todo, 'id' | 'completed'> {}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {}

export interface QueryTodoDto {
  searchTerm?: string;
  completed?: boolean;
}
