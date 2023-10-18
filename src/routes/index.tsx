import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Todo from "~/components/todo/Todo";

export default component$(() => {
  return (<Todo />)
});

export const head: DocumentHead = {
  title: "Todo App",
  meta: [
    {
      name: "description",
      content: "Todo App with qwik",
    },
  ],
};
