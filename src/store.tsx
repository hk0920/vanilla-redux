import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text:string)=>{
  return {
    type:ADD, 
    text
  }
}
const deleteTodo = (id:number)=>{
  return {
    type:DELETE, 
    id
  }
}

const reducer = (state:Array<Object> = [], action:any)=>{
  switch(action.type){
    case ADD:
      return [{text:action.text, id:Date.now()}, ...state];
    case DELETE:
      return state.filter((toDo:any) => toDo.id !== action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);
// store.subscribe();

export default store;