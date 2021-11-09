import React from "react";
import "./App.scss";
import TodoList from "./components/todoListComponent/todoListComponent";
import { TodoProvider } from "./contexts/todoContext";

function App() {
  return (
    <div className="App container">
      <main>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </main>
    </div>
  );
}

export default App;
