import { server$ } from "@builder.io/qwik-city";
import { GetAllTodo } from "~/domain/Todo/action/GetAllTodo.action";
import { TodoLocalFileImplementation } from "../implementation/TodoLocalFile.implementation";
import type { TodoInterface } from "../domain/Todo";

export const getAllTodoHook = server$(async (): Promise<TodoInterface[]> => {
    const todoLocalFile = new TodoLocalFileImplementation()
    const getAllTodoAction = new GetAllTodo(todoLocalFile)
    const data = await getAllTodoAction.run()
    return data.map(item => item.toJson())
});