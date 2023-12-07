import { connect } from "http2";
import {useState} from "react";

const Home = () =>{
  const [text, setText] = useState("");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value);
  }

  const sendSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    setText("");
  }

  return (
    <div className="box__component">
      <h3 className="text__title">3. React+Redux : To do list</h3>
      <form action="" onSubmit={sendSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <ul className="list__todo"></ul>
    </div>
  )
}

const getCurrentState =(state:any, ownProps:any)=>{
  console.log(state, ownProps)

}

export default connect(getCurrentState)(Home);