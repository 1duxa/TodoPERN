import {API_URL} from "./config"


export default async (password:string) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type":'application/json'
    },
    body:JSON.stringify({
        password,
    })
  });

  if(!res.ok){
    throw new Error("Wrong password")
  }else{
  return await res.json();
  }
  };