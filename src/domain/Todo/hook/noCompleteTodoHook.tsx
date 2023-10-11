import { server$ } from "@builder.io/qwik-city";
import { TodoLocalFileImplementation } from "../implementation/TodoLocalFile.implementation";
import { NoCompleteTodo } from "../action/NoCompleteTodo.action";

export const noCompleteTodoHook = server$(async (id: string): Promise<void> => {
    const todoLocalFile = new TodoLocalFileImplementation()
    const noCompleteTodoAction = new NoCompleteTodo(todoLocalFile)
    await noCompleteTodoAction.run(id)
});