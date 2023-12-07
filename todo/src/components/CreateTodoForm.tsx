import { useQueryClient, useMutation } from "react-query";
import { Todo } from "../App";
import addTodoRequest from "../api/addTodoRequest";
import { useState } from "react";

const CreateTodoForm = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  //Add Todos
  const { mutate: addTodo } = useMutation(
    (newTodo: Todo) => addTodoRequest(newTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({
          todo_desc: text,
          todo_completed: false,
        });
      }}
      className="flex w-full gap-3 mt-4 justify-center"
    >
      <input type="text" placeholder="Add new todo..."
      className=" outline-none pl-2 flex-[.5] h-12
      rounded-tl-md rounded-tr-md shadow-md mb-1"
      onChange={(e) => setText(e.target.value)} />

      <input type="submit" value="Add"
      className="border-2 border-zinc-300 hover:border-black
      duration-500 text-zinc-600 hover:text-black
      rounded-md w-20 h-12 text-[17px] font-medium" />
    </form>
  );
};

export default CreateTodoForm;
