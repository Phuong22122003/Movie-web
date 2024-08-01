import icon from "./../../assets/icon/user-icon.svg"
export default function CommentComponent({listComment}){
  console.log(listComment)
    const comments = listComment.map((comment)=>(
      <li>
        <div style={{display:'flex',alignItems:'center'}}>
            <img src={icon} style={{backgroundColor:'white', borderRadius:'50%'}}></img>
            {comment.username}

        </div>
        {comment.comment}
      </li>
    ))
    return(
      <div style={{height:'300px',backgroundColor:'#1e1e1e',display:'flex',flexDirection:'column'}}>
          <ul style={{color:'white',listStyleType:'none'}}>
              {comments}
          </ul>
          <input ></input>
          <button>Comment</button>
      </div>
    )
}