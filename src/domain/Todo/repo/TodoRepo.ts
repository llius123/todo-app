import type { Todo } from "../domain/Todo";

export interface TodoRepo {
    saveTodo(todo: Todo): void;
    getAllTodo(): Promise<Todo[]>;
    removeTodo(id: string): Promise<void>
    completeTodo(id: string): Promise<void>
    noCompleteTodo(id: string): Promise<void>
}