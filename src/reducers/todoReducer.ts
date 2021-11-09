import { TodoItemInterface } from "../components/todoComponent/todoComponent";
import { ReducerInterface } from "../contexts/todoContext";
import { ACTIONS } from "./../constants/contants";

const reducer = (state: TodoItemInterface[], action: ReducerInterface): any => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...state, action.item];
    case ACTIONS.REMOVE_TODO:
      return state.filter((td) => td.id !== action.item.id);
    case ACTIONS.COMPLETE_TODO:
      return state.map((td) =>
        td.id === action.item.id ? { ...td, isDone: !action.item.isDone } : td
      );
  }
};

export default reducer;
