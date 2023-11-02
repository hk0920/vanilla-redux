import { createStore } from "redux";

const addBtn = document.querySelector(".add") as HTMLElement;
const minusBtn = document.querySelector(".minus") as HTMLElement;
const number = document.querySelector(".number") as HTMLElement;

// 바닐라 스크립트 : 증가/감소 이벤트 
// let count = 0;
// const updateText = () =>{
//   number.innerText = count.toString();
// }

// const handleAdd = () => {
//   count++;
//   updateText();
// }

// const handleMinus = () => {
//   count--;
//   updateText();
// }

// addBtn.addEventListener("click", handleAdd);
// minusBtn.addEventListener("click", handleMinus);


// 위에 있는 이벤트를 redux로 상태관리 해보자
const countModifier = () =>{ // 2. reducer = 함수 : 함수 생성 후 저장소 생성
  return "hello";
}
const countStore = createStore(countModifier); // 1. 데이터 저장하는 저장소 생성 -> 이때 reducer는 함수를 말한다.

console.log(countStore.getState()) // 3. 저장소에 있는 데이터 확인

export{}