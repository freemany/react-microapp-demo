import { useContext } from "react";
import { TodoContext } from "./todoContext";

const useTodo = () => useContext(TodoContext);

export default useTodo;
