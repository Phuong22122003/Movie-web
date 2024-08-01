import "./movie-detail.css"
import "./../commons/default.css"
import { Link } from "react-router-dom"
export default function MovieDetailComponent({movie}){
    return(
        <div className="detail-wrapper">
            <div className="img-name-wrapper">
                <img src = {movie.imagePath}/>
                <div>
                    <p className="name">Tên: {movie.name}</p>
                    <p>Thời lượng: {movie.length} phút</p>
                    <Link className="btnWatch" to={"/movie/" + movie.id}>Xem</Link>
                </div>
            </div>
            <p className="description">
                {movie.description}                
            </p>
        </div>
    )
}