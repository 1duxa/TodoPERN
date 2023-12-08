import { Navigate, Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import { createContext, useContext, useState } from "react";

export interface Todo {
  todo_id?: number;
  todo_desc: string;
  todo_completed: boolean;
}

export type TokenContextType = [string, (token: string) => void];
export const TokenContext = createContext<TokenContextType>(["", () => {}]);

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const [token] = useContext(TokenContext);
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <>
      <TokenContext.Provider value={[token, setToken]}>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<TodoPage />} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </TokenContext.Provider>
    </>
  );
}

export default App;
