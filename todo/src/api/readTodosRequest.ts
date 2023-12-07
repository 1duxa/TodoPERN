import {API_URL,token} from "./config"

export default async () => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":'application/json'
    },
  });
  return await res.json();
};
