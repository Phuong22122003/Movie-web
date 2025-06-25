
import  {useState, useEffect } from "react"
import MovieListComponent from "../../components/movie-list/list-movie";
import { getMovies } from "../../service/MovieService";

export default  function MovieList(){
    const [listMovie,setListMovie] = useState([])
    useEffect(()=>{
        console.log('Component mounted');
        getMovies()
        .then(data=>{
            setListMovie(data)
        })
        .catch(error=>{
            console.log(error)
        })
        return ()=>{
        }
    },[])
    return(
            listMovie.length>0? (
                <MovieListComponent listMovie = {listMovie} />  
            ): (
                <div style={{color:'white'}}>Hiện tại chưa có phim</div>
            )
    )
}