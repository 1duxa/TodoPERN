import {API_URL,token} from "./config"
import { Todo } from "../App";

export default async (todo:Todo) => {
  const res = await fetch(`${API_URL}/todos/${todo.todo_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":'application/json'
    },
    body:JSON.stringify({
        desc:todo.todo_desc,
        completed:todo.todo_completed
    })
  });

  
  return await res.json();
};