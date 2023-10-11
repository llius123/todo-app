import type { Todo } from "../domain/Todo";
import type { TodoRepo } from "../repo/TodoRepo";


export class CompleteTodo {
    constructor(public TodoRepo: TodoRepo) {

    }

    run(id: string): Promise<void> {
        return this.TodoRepo.completeTodo(id)
    }
}
