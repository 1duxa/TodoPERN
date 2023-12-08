import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
