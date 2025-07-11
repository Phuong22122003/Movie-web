import "./MovieList.css"
import pen from "../../assets/common/pen.svg"
import play from "../../assets/common/play.svg"
import { useNavigate } from "react-router-dom";
export default function MovieList(props){
    const navigate = useNavigate();
    function playVideo(id){
        navigate('/movie/'+id)
    }

    const listItem = props.movies.map((item,key)=>(
        <div className="added-item" key={key}>
            <div className = "image-name" >
                <img className = "image" src={item.imagePath}></img>
                <div style = {{width:'200px'}}>
                    <p  >{item.name}</p>
                    <img className = "icon" src={pen} onClick={()=>props.btnEditMovieHandelClick(item)}></img>
                    <img className = "icon" src={play} onClick={()=>playVideo(item.id)}></img>
                </div>
            </div>
            <p>{item.description}</p>
            <p>Thời lượng: {item.length}</p>
            <span className = "delete" onClick={()=>props.deleteVideo(item.id)}>Delete video</span>
        </div>
    ))
    return(
        <div   >
            <div className="movies-added-wrapper">
            <span className="btnAdd" onClick={props.btnAddMovieHandleClick }>Add</span>
            {listItem}
            </div>
        </div>
    )
}