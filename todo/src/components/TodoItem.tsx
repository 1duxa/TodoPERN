import { useQueryClient, useMutation } from "react-query";
import { Todo } from "../App";
import updateTodoRequest from "../api/updateTodoRequest";
import deleteTodoRequest from "../api/deleteTodoRequest";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Edit from "@mui/icons-material/ModeEditOutlined";
import Checkbox from "@mui/material/Checkbox";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const [newDesc, setNewDesc] = useState<string>("");

  //Update Todos
  const { mutate: updateTodo } = useMutation(
    (updatedTodo: Todo) => updateTodoRequest(updatedTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const handleCheckboxChange = () => {
    updateTodo({ ...todo, todo_completed: !todo.todo_completed });
  };

  const handleTodoDescSubmit = () => {
    updateTodo({ ...todo, todo_desc: newDesc });
  };

  //Deleting todos
  const { mutate: deleteTodo } = useMutation(
    (todoItem: Todo) => deleteTodoRequest(todoItem),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  //Add Todos

  return (
    <div className="flex items-center w-full max-w-[700px]">
      <div>
        <Checkbox
          onChange={handleCheckboxChange}
          checked={todo.todo_completed}
        />
      </div>
      <div className="flex-1">
        <Accordion>
          <AccordionSummary expandIcon={<Edit />}>
            <p className="text-[20px]">
              {`${todo.todo_id}.`}{" "}
              <span className="ml-3 max-w-[300px]">{todo.todo_desc}</span>
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTodoDescSubmit();
              }}
              className="text-[20px] flex gap-2"
            >
              <input
                className="outline-none flex-1"
                onChange={(e) => setNewDesc(e.target.value)}
                type="text"
                placeholder="Change description..."
              />
              <input
                type="submit"
                value="Submit"
                className="border-2 border-zinc-300 hover:border-black
                  duration-500 text-zinc-600 hover:text-black
                  rounded-md p-1 w-20 h-12 text-[17px] font-medium"
              />
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="ml-3 cursor-pointer">
        <Delete onClick={() => deleteTodo(todo)} />
      </div>
    </div>
  );
};

export default TodoItem;
