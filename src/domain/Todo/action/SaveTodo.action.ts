import type { Todo } from "../domain/Todo";
import type { TodoRepo } from "../repo/TodoRepo";

export class SaveTodo {
    constructor(public TodoRepo: TodoRepo) {

    }
    run(todo: Todo) {
        this.TodoRepo.saveTodo(todo)
    }
}
