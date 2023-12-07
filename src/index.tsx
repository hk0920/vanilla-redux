import { createStore } from "redux";

const counterEvent = () => {
  console.log("counterEvent")
  const $boxCounter = document.querySelector(".box__component-counter");
  const $addBtn = $boxCounter?.querySelector(".add") as HTMLElement;
  const $minusBtn = $boxCounter?.querySelector(".minus") as HTMLElement;
  const $number = $boxCounter?.querySelector(".number") as HTMLElement;
  
  // 바닐라 스크립트 : 증가/감소 이벤트 
  // let count = 0;
  // const updateText = () =>{
  //   $number.innerText = count.toString();
  // }
  
  // const handleAdd = () => {
  //   count++;
  //   updateText();
  // }
  
  // const handleMinus = () => {
  //   count--;
  //   updateText();
  // }
  
  // $addBtn.addEventListener("click", handleAdd);
  // $minusBtn.addEventListener("click", handleMinus);
  
  
  // 위에 있는 이벤트를 redux로 상태관리 해보자
  // reducer의 parameter 구성 (state, auction, )
  // reducer가 return하는 것은 무엇이든 application의 state가 된다.
  
  // 변수에 action.type을 저장하면 유지보수 용이하다.
  const ADD = "ADD";
  const MINUS = "MINUS";
  
  const countModifier = (count = 0, action:any) =>{ // 2. reducer = 함수 : 함수 생성 후 저장소 생성 => redux의 장점 : 유일하게 한개의 함수만 data를 수정할 수 있다.
    // console.log(count, action)
  
    // if(action.type === "ADD"){  // action.type 전달값으로 확인 -> 분기처리
    //   return ++count;
    // }else if(action.type==="MINUS"){
    //   return --count;
    // }else{
    //   return count;
    // }  
  
    // 위의 if문을 switch 문으로 변경
    switch(action.type){
      case ADD:
        return ++count;
      case MINUS:
        return --count;  
      default: 
        return count;
    }
  }
  const countStore = createStore(countModifier); // 1. 데이터 저장하는 저장소 생성 -> 이때 reducer는 함수를 말한다.
  
  console.log(countStore.getState()) // 3. 저장소에 있는 데이터(state) 확인
  
  const onChange=()=>{
    console.log("store 변화 감지", countStore.getState())
    $number.innerText = countStore.getState().toString();  
  }
  
  countStore.subscribe(onChange) // store 변화 감지
  
  const handleAdd = ()=>{
    countStore.dispatch({type:ADD});  // 4. reducer의 action값을 보낼 경우 dispatch를 사용 -> "object"로 전달
  }
  const handleMinus = ()=>{
    countStore.dispatch({type:MINUS});
  }
  
  $addBtn.addEventListener("click", handleAdd);
  
  $minusBtn.addEventListener("click", handleMinus);
}

const todoEvent = () => {
  const $todoBox = document.querySelector(".box__component-todo");
  const $form = $todoBox?.querySelector("form") as HTMLFormElement;
  const $input = $todoBox?.querySelector("input") as HTMLInputElement;
  const $todoList = $todoBox?.querySelector(".list__todo") as HTMLUListElement;

  const ADD_TODO = "ADD_TODO";
  const DELETE_TODO = "DELETE_TODO";
  
  const reducer = (state:Array<Object>=[], action:any)=>{
    console.log(state)
    // console.log(action) // type , text -> 전달 받은거 확인
    // 꼭 Mutate state 사용하지 마라!!!!!
    // store 값을 변경할 수 있는건 action을 보내서 변경할 수 있다!! -> 상태를 수정하는 것이 아니라 "새로운 값을 return 하는 것"이다
    // Mutate state  예시 ) state가 배열이기 때문에 state.push(action.text) 와 같이 조작 No!!
    switch(action.type){
      case ADD_TODO:
        const newTodoObj = {text:action.text, id:Date.now()}; 
        return [...state, newTodoObj];  // ...스프레드 : 배열 안의 값을 return / , {text: 새로운 값} 추가 후 return
      case DELETE_TODO:
        const cleaned = state.filter((toDo:any) => toDo.id !== action.id);
        return cleaned;
      default:
        return state;
    }
  }

  // javascript 동작 이벤트 함수 -> redux store에 dispatch로 넣으면 건너뛸 수 있다.
  // javascript 로 동작하면 동적으로 밖에 안됨. -> 상태관리하기 위해 dispatch, subscribe ...으로 관리 
  const createTodo = (todo:any) =>{
    const $item = document.createElement("li.list-item");
    $item.innerText = todo;
    $todoList?.appendChild($item);
  }

  // 성능 최적화를 위해 return 하는 함수를 따로 생성
  // action => return 하는 함수 
  const addTodo = (text:string)=>{
    return {
      type:ADD_TODO, 
      text
    };
  };

  // dispatch 하는 용으로만 사용 -> 함수 생성 
  const dispatchAddTodo =(text:string)=>{
    store.dispatch(addTodo(text))
  }

  const deleteTodo = (id:number)=>{
    return{
      type:DELETE_TODO,
      id
    };
  };

  const dispatchDeleteTodo=(e:any)=>{
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteTodo(id))
  }

  // 화면 그리기 함수 
  const paintTodos=()=>{
    $todoList.innerHTML="";
    
    const toDos = store.getState();
    toDos.forEach((toDo:any)=>{
      const $li = document.createElement("li");
      $li.id = toDo.id;
      $li.innerText = toDo.text;

      const $deleteButton = document.createElement("button");
      $deleteButton.innerText="Delete";

      $deleteButton.addEventListener("click", dispatchDeleteTodo); // 삭제 
      $li.appendChild($deleteButton);
      $todoList.appendChild($li);
    })
  }

  const onSubmit = (e:any)=>{
    e.preventDefault();
    const toDo = $input.value;
    $input.value = "";
    // createTodo(toDo); // createTodo 함수 보다 dispatch 를 사용하면 store 값을 업데이트할 수 있다.
    // store.dispatch({type:ADD_TODO, text:toDo}) // dispatchAddTodo() 함수로 대체  
    dispatchAddTodo(toDo)
  }

  const store = createStore(reducer);

  // subscribe() -> store 변화 감지
  // store.subscribe(()=>console.log(store.getState())) 
  store.subscribe(paintTodos);

  $form.addEventListener("submit", onSubmit);
}

counterEvent();
todoEvent()

export{}