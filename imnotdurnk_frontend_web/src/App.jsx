import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Router from "../Router.jsx";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
