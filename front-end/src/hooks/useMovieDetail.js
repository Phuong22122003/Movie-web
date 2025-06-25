import { useEffect, useState } from "react"
import { getMovieDetail } from "../service/MovieService"

export default function useMovieDetail(id){
    const [movie,setMovie] = useState({})
    useEffect(()=>{
        getMovieDetail(id)
        .then(data=>{
            setMovie(data)
        })
        .catch(error=>{
            window.alert(error)
        })
    },[id])
    return movie;
}