import React, { useEffect, useState } from "react";
import "./todoInputComponent.scss";
import { TodoInterface } from "./../todoListComponent/todoListComponent";
import { v4 as uuidv4 } from "uuid";
import { useApp } from "../../contexts/appContext";

export interface TodoInputPros {
  addItem: (item: TodoInterface) => void;
}
const TodoInput: React.FC<TodoInputPros> = ({ addItem }) => {
  const { props } = useApp();
  const ChannelManager = props.ChannelManager;
  const [value, setValue] = useState("");
  const createItem = () => {
    addItem({ id: uuidv4(), name: value, isDone: false });
    setValue("");
    if (props.id === "app1") {
      ChannelManager.pub(`app1:app2:todo:typing`, "");
    }
  };
  useEffect(() => {
    ChannelManager.subOnce(`app1:${props.id}:todo:typing`, (name) =>
      setValue(name)
    );
  }, []);
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Item name"
          aria-label="item name"
          onChange={(event) => {
            setValue(event.target.value);
            if (props.id === "app1") {
              ChannelManager.pub(`app1:app2:todo:typing`, event.target.value);
            }
          }}
          onBlur={(event) => setValue(event.target.value)}
          value={value}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={createItem}>
            Add item
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoInput;
