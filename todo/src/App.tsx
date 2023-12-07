import readTodosRequest from "./api/readTodosRequest";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InfinitySpin } from "react-loader-spinner";
import TodoItem from "./components/TodoItem";
import CreateTodoForm from "./components/CreateTodoForm";
import deleteAllTodosRequest from "./api/deleteAllTodosRequest";

export interface Todo {
  todo_id?: number;
  todo_desc: string;
  todo_completed: boolean;
}

function App() {
  const { isLoading, data: todos = [] } = useQuery<Todo[]>("todos", readTodosRequest);
  const sortedTodos = todos
    .slice()
    .sort((a, b) => (a.todo_id || 0) - (b.todo_id || 0));

    const queryClient = useQueryClient();
    const { mutate: deleteAllTodos } = useMutation(
      () => deleteAllTodosRequest(),
      {
        onSettled: () => {
          queryClient.invalidateQueries("todos");
        },
      }
    );

  return (
    <>
      <div className="bg-slate-100 min-h-[100vh] flex flex-col items-center">
        <h1 className="text-[38px] text-center mt-5">Hello!</h1>
        <h2 className="text-[28px] text-center"> This is my todo</h2>
        <CreateTodoForm />
        <div
          className="flex flex-col justify-center items-center gap-2 text-[27px] max-w-[1200px]
         rounded-md py-4 bg-zinc-100 mx-5"
        >
          {isLoading ? (
            <InfinitySpin width="200" color="gray" />
          ) : (
            sortedTodos.map((todo) => (
              <TodoItem key={todo.todo_id} todo={todo} />
            ))
          )}
        </div>
        <button className="border-2 border-zinc-300 hover:border-black
                  duration-500 text-zinc-600 hover:text-black
                  rounded-md p-1 w-28 h-12 text-[17px] font-medium"
                onClick={()=>deleteAllTodos()}>
                    Delete All
        </button>
      </div>
    </>
  );
}

export default App;
