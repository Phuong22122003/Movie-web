import { useParams } from "react-router-dom";
import MovieDetailComponent from "../../components/user/movie-detail";
import ListMovies from "./list-movies";
import CommentComponent from "../../components/user/comment";
import MovieComponent from "../../components/user/movie";
import { useEffect, useState } from "react";


export default function Movie(){
    const {id} = useParams()
    const [movie,setMovie] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [comments,setComments] = useState([{}])
    let isFirstReder = true;
    useEffect(()=>{
        if(isFirstReder)
        fetch('http://localhost:8080/api/v1/movie/get?id=' +id)
        .then(respone=>respone.json())
        .then((data)=>{
            setMovie(data)
            console.log(movie)
            setIsLoading(false)
            setComments(data.listComment)
        })
        return ()=>{
            isFirstReder = false
        }
    },[id])
    return(
        <div>
            {isLoading? <h2 style={{color:'white'}}>loading</h2>:<MovieComponent movie={movie}></MovieComponent>}
            {isLoading?
                <h2> loading</h2>:
                <CommentComponent listComment={comments} />
            }

            <h2 style={{color:'white'}}>Có thể bạn cũng thích</h2>
            {!isLoading&&<ListMovies url={'http://localhost:8080/api/v1/movie/list-movie?genre=' + movie.genre +'&id='+id}></ListMovies>}
            
        </div>
    )
}