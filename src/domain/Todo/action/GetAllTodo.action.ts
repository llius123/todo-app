import type { Todo } from "../domain/Todo";
import type { TodoRepo } from "../repo/TodoRepo";


export class GetAllTodo {
    constructor(public TodoRepo: TodoRepo) {

    }

    run(): Promise<Todo[]> {
        return this.TodoRepo.getAllTodo()
    }
}
