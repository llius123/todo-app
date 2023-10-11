import { server$ } from "@builder.io/qwik-city";
import { TodoLocalFileImplementation } from "../implementation/TodoLocalFile.implementation";
import { CompleteTodo } from "../action/CompleteTodo.action";

export const completeTodoHook = server$(async (id: string): Promise<void> => {
    const todoLocalFile = new TodoLocalFileImplementation()
    const completeTodoAction = new CompleteTodo(todoLocalFile)
    await completeTodoAction.run(id)
});