import React, { useState, useCallback, useContext, useEffect } from "react";
import { ACTIONS } from "../../constants/contants";
import { TodoContext } from "./../../contexts/todoContext";
import Todo from "./../todoComponent/todoComponent";
import TodoInput from "./../todoInputComponent/todoInputComponent";
import { useApp } from "../../contexts/appContext";

const Logger = {
  log: (msg) => alert(msg),
};

export interface TodoInterface {
  name: string;
  id: string;
  isDone: boolean;
}
export interface TodoListInterface {}
const TodoList: React.FC<TodoListInterface> = () => {
  const [logger, setLogger] = useState(null);
  const { props } = useApp();
  const ChannelManager = props.ChannelManager;
  const apiService = props.apiService;
  const { todoItems, dispatch } = useContext(TodoContext);
  const removeItem = useCallback((item) => {
    // Api call
    apiService.remove();

    dispatch({ type: ACTIONS.REMOVE_TODO, item });
    if ("app1" === props.id) {
      ChannelManager.pub("app1:app2:todo:remove", item);
    }
  }, []);
  const addItem = useCallback(
    (item) => {
      // Api call
      apiService.create();

      dispatch({ type: ACTIONS.ADD_TODO, item });
      if ("app1" === props.id) {
        ChannelManager.pub("app1:app2:todo:add", item);
      }
      if (logger?.log) {
        logger.log("Add todo name=" + item.name);
      }
    },
    [logger]
  );
  const completeItem = useCallback((item) => {
    dispatch({ type: ACTIONS.COMPLETE_TODO, item });
    if ("app1" === props.id) {
      ChannelManager.pub("app1:app2:todo:complete", item);
    }
  }, []);

  useEffect(() => {
    ChannelManager.sub(`app1:${props.id}:todo:add`, (item) => {
      dispatch({ type: ACTIONS.ADD_TODO, item });
    });
    ChannelManager.sub(`app1:${props.id}:todo:remove`, (item) =>
      dispatch({ type: ACTIONS.REMOVE_TODO, item })
    );
    ChannelManager.sub(`app1:${props.id}:todo:complete`, (item) =>
      dispatch({ type: ACTIONS.COMPLETE_TODO, item })
    );
  }, []);

  useEffect(() => {
    ChannelManager.subLast(`parent:${props.id}:todo:delete`, (name) => {
      todoItems.forEach((item) => {
        if (item.name === name) {
          dispatch({ type: ACTIONS.REMOVE_TODO, item });
        }
      });
    });
  }, [todoItems]);

  return (
    <div>
      <h1>{props.title ?? "Todo list"}</h1>
      <TodoInput addItem={addItem} />
      <ul className="todoListComponent__list">
        {todoItems?.map((todo) => (
          <Todo
            key={todo.id}
            item={todo}
            removeItem={removeItem}
            completeItem={completeItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
