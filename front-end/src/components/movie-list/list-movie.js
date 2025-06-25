import { useNavigate } from "react-router-dom";
import "./list-movie.css"
export default function MovieListComponent({listMovie}){
    const navigate = useNavigate();
    function navigateToDetailMovie(id){
            navigate("/detail/" + id)
    }
    const items = listMovie.map((item,key)=>
        <div key={key} className="item" onClick={()=>navigateToDetailMovie(item.id)}>
            <img src = {item.imagePath} />
            <p >{item.name}</p>
        </div>
    )
    return(
        <div className = "listMovie">
            {items}
        </div>
    )
}