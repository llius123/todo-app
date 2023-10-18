import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { TodoInterface } from "~/domain/Todo/domain/Todo";
import { getAllTodoHook } from "~/domain/Todo/hook/getAllTodoHook";
import { saveTodoHook } from "~/domain/Todo/hook/saveTodoHook";
import TodoList from "./todo-list/TodoList";

export default component$(() => {
    const todos = useSignal<TodoInterface[]>([]);
    const inputRef = useSignal<HTMLInputElement>();

    const getTodos = $(async () => {
        const res = await getAllTodoHook()
        todos.value = res;
    })

    useTask$(async () => {
        await getTodos()
    });

    const saveTodo = $(async () => {
        const todo: TodoInterface = {
            id: Math.round((Math.random() * 9999)).toString(),
            title: inputRef.value?.value || '',
            completed: false
        }
        await saveTodoHook(todo)
        getTodos()
    })




    return (
        <div style={{
            padding: '10px',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <div class="flex">
                <input ref={inputRef} class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                <button class="btn btn-primary" onClick$={saveTodo}>Create TODO</button>
            </div>
            <div style={{ overflow: 'auto', flex: 1, height: 'auto' }}>
                <TodoList todos={todos.value} refreshList={getTodos} />
            </div>
        </div>
    );
});