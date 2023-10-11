import { $, QRL, component$ } from "@builder.io/qwik";
import type { TodoInterface } from "~/domain/Todo/domain/Todo";
import { completeTodoHook } from "~/domain/Todo/hook/completeTodoHook";
import { noCompleteTodoHook } from "~/domain/Todo/hook/noCompleteTodoHook";
import { removeTodoHook } from "~/domain/Todo/hook/removeTodoHook";

export default component$<{ todos: TodoInterface[], refreshList: QRL<() => Promise<void>> }>(({ todos, refreshList }) => {


    const remove = $(async (todo: TodoInterface) => {
        await removeTodoHook(todo.id)
        refreshList()
    })

    const complete = $(async (todo: TodoInterface) => {
        await completeTodoHook(todo.id)
        refreshList()
    })

    const noComplete = $(async (todo: TodoInterface) => {
        await noCompleteTodoHook(todo.id)
        refreshList()
    })

    return (
        <>
            {
                todos.map(todo => (
                    <div class="mb-2 flex flex-row justify-between px-4 py-8 border-2 border-rose-500 rounded-lg" key={todo.id}>
                        {
                            todo.completed ? <IconTodoCompleted click={$(() => noComplete(todo))} /> : <IconTodoNoCompleted click={$(() => complete(todo))} />
                        }
                        <a href="#">
                            <p class="ml-1 hover:underline text-xl">{todo.title}</p>
                        </a>
                        <IconTrash click={$(() => remove(todo))} />
                    </div>
                ))
            }
        </>
    )
})

const IconTodoNoCompleted = ({ click }: { click: QRL<() => void> }) => (
    // <div class="cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check cursor-pointer" width="24"
        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#212121" fill="none" stroke-linecap="round"
        stroke-linejoin="round" onClick$={$(() => click())}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="9" fill="#fff"></circle>
        <path d="M9 12l2 2l4 -4"></path>
    </svg>
    // </div>
)

const IconTodoCompleted = ({ click }: { click: QRL<() => void> }) => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24"
        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round"
        stroke-linejoin="round" onClick$={$(() => click())}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="9" fill="#00AA45"></circle>
        <path d="M9 12l2 2l4 -4"></path>
    </svg>
)

const IconTrash = ({ click }: { click: QRL<() => void> }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="cursor-pointer"
        onClick$={$(() => { click() })}
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
            fill="currentColor"
        />
        <path d="M9 9H11V17H9V9Z" fill="currentColor" />
        <path d="M13 9H15V17H13V9Z" fill="currentColor" />
    </svg>
)