import type { TodoInterface } from "../domain/Todo";
import { Todo } from "../domain/Todo";
import type { TodoRepo } from "../repo/TodoRepo";
import { readFile, writeFile } from 'node:fs/promises';

export class TodoLocalFileImplementation implements TodoRepo {

    private fileName = "todo.json";
    constructor() { }
    async saveTodo(todo: Todo): Promise<void> {
        const data = await this.findLocalDatabaseAndReturnData()
        data.push(todo)
        this.findLocalDatabaseAndSaveData(data)
    }
    async getAllTodo(): Promise<Todo[]> {
        const data = await this.findLocalDatabaseAndReturnData()

        return data
    }

    async removeTodo(id: string): Promise<void> {
        const allItems = await this.findLocalDatabaseAndReturnData()
        const indexElementToRemove = allItems.findIndex(todo => todo.id === id)
        allItems.splice(indexElementToRemove, 1)
        await this.findLocalDatabaseAndSaveData(allItems)
    }

    async completeTodo(id: string): Promise<void> {
        await this.changeTodoComplete(id, true)
    }

    async noCompleteTodo(id: string): Promise<void> {
        await this.changeTodoComplete(id, false)
    }

    private async changeTodoComplete(id: string, complete: boolean): Promise<void> {
        const allItems = await this.findLocalDatabaseAndReturnData()
        const indexElementToComplete = allItems.findIndex(todo => todo.id === id)
        allItems[indexElementToComplete].completed = complete
        await this.findLocalDatabaseAndSaveData(allItems)
    }


    private async findLocalDatabaseAndReturnData(): Promise<Todo[]> {
        const a = await readFile(this.fileName, { encoding: 'utf8' })
        const todosJson: TodoInterface[] = JSON.parse(a)

        const todos: Todo[] = []
        for (let index = 0; index < todosJson.length; index++) {
            const item = todosJson[index]
            const todo = new Todo()
            todo.generate(item.id, item.title, item.completed)
            todos.push(todo)
        }
        return todos
    }

    private async findLocalDatabaseAndSaveData(allTodos: Todo[]): Promise<void> {
        const data = allTodos.map(todo => todo.toJson())
        await writeFile(this.fileName, JSON.stringify(data), { encoding: 'utf8' });
    }


}