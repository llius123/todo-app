import { TodoRepo } from "../repo/TodoRepo";

export class RemoveTodo {
    constructor(public TodoRepo: TodoRepo) {

    }

    run(id: string): Promise<void> {
        return this.TodoRepo.removeTodo(id)
    }
}
