export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {}

export interface QueryTodoDto {
  searchTerm?: string;
}
