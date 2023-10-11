import { server$ } from "@builder.io/qwik-city";
import { TodoLocalFileImplementation } from "../implementation/TodoLocalFile.implementation";
import type { TodoInterface } from "../domain/Todo";
import { Todo } from "../domain/Todo";
import { SaveTodo } from "../action/SaveTodo.action";

export const saveTodoHook = server$(async (todoJson: TodoInterface): Promise<void> => {
    const todoLocalFileImplementation = new TodoLocalFileImplementation()
    const saveTodoAction = new SaveTodo(todoLocalFileImplementation)
    const todo = new Todo()
    todo.generate(todoJson.id, todoJson.title, todoJson.completed)
    await saveTodoAction.run(todo)
});