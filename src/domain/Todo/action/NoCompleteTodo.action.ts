import type { TodoRepo } from "../repo/TodoRepo";


export class NoCompleteTodo {
    constructor(public TodoRepo: TodoRepo) {

    }

    run(id: string): Promise<void> {
        return this.TodoRepo.noCompleteTodo(id)
    }
}
