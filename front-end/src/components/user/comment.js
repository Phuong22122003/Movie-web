import icon from "./../../assets/icon/user-icon.svg"
import "./comment.css"
import send from  "../../assets/common/send.svg"
import { useRef, useState } from "react"
export default function CommentComponent(props){
  const [inputValue,setInputValue]=useState("")
  const inputRef = useRef(null)
  function onInputChange(e){
      setInputValue(e.target.value);
  }
    const comments = props.listComment.map((comment)=>(
      <li>
        <div className="commentIcon" >
            <img   src={icon} style={{backgroundColor:'white', borderRadius:'50%'}}></img>
            {comment.username}

        </div>
        <p className="text">
          {comment.comment}
        </p>
      </li>
    ))
    return(
      <div style={{minHeight:'300px',backgroundColor:'#1e1e1e',display:'flex',flexDirection:'column'}}>
          <div className="comment-input-wrapper">
            <input ref={inputRef} value={inputValue} placeholder="Add a comment" required  onChange={onInputChange} className="comment-input" ></input>
            <span onClick={()=>props.sendComment(inputRef.current,setInputValue)}>
              <img src={send} className="send"/>
            </span>
          </div>
          <ul className="list-comment">
              {comments}
          </ul>
      </div>
    )
}