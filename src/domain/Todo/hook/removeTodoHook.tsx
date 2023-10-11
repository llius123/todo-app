import { server$ } from "@builder.io/qwik-city";
import { TodoLocalFileImplementation } from "../implementation/TodoLocalFile.implementation";
import type { TodoInterface } from "../domain/Todo";
import { RemoveTodo } from "../action/RemoveTodo.action";

export const removeTodoHook = server$(async (id: string): Promise<void> => {
    const todoLocalFileImplementation = new TodoLocalFileImplementation()
    const removeTodoAction = new RemoveTodo(todoLocalFileImplementation)
    await removeTodoAction.run(id)
});