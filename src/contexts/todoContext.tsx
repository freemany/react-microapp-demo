import React, { createContext, ReactNode, useReducer } from "react";
import { TodoItemInterface } from "./../components/todoComponent/todoComponent";
import todoReducer from "./../reducers/todoReducer";

const todos = [
  { id: "1", name: "first", isDone: false },
  { id: "2", name: "second", isDone: false },
];

export interface ReducerInterface {
  type: string;
  item?: any;
}
export interface TodoContextInterface {
  todoItems?: TodoItemInterface[];
  dispatch?: (data: ReducerInterface) => void;
}
export interface TodoProviderInterface {
  children: ReactNode;
  initialTodos?: TodoItemInterface[];
}
export const TodoContext = createContext<TodoContextInterface>({});
export const TodoProvider: React.FC<TodoProviderInterface> = ({
  initialTodos,
  children,
}) => {
  const [todoItems, dispatch] = useReducer(todoReducer, initialTodos ?? todos);

  return (
    <TodoContext.Provider value={{ todoItems, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
