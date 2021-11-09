import React from "react";
import "./todoComponent.scss";

export interface TodoItemInterface {
  id: string;
  name: string;
  isDone: boolean;
}
export interface TodoPros {
  item: TodoItemInterface;
  removeItem: (item: TodoItemInterface) => void;
  completeItem: (item: TodoItemInterface) => void;
}
const Todo: React.FC<TodoPros> = ({ item, removeItem, completeItem }) => {
  return (
    <li
      className={`todoComponent__container list-group-item ${
        item.isDone ? "done" : ""
      }`}
    >
      <span className="todoComponent__itemName">{item.name}</span>
      <button
        className="remove-btn btn btn-outline-danger btn-sm"
        aria-label={`Remove ${item.name}`}
        onClick={() => removeItem(item)}
      >
        Remove X
      </button>
      <button
        className="done-btn btn btn-outline-success btn-sm"
        aria-label={`${item.isDone ? "Uncomplete" : "Complete"} ${item.name}`}
        onClick={() => completeItem(item)}
      >
        {item.isDone ? "Uncomplete" : "Complete"}
      </button>
    </li>
  );
};

export default Todo;
