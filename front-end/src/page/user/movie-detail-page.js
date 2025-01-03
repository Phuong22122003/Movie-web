import { useEffect, useState } from "react"
import ListMovies from "./list-movies"
import { useParams } from 'react-router-dom';
import MovieDetailComponent from "./../../components/user/movie-detail"
import { ip } from "../../utils/local-ip";
export default function MovieDetail(){
    const [movie,setMovie] = useState({})
    const { id } = useParams()//get id on url
    let isFistRender = true
    useEffect(()=>{
        if(isFistRender)
        console.log('aaaaaaaaaaaaaaaaaaaaaa')
        fetch(`http://${ip}:8080/api/v1/movie/detail?id=${id}`)
        .then(resone=>resone.json())
        .then(data=>{
           setMovie(data)
        })
        .catch(error=>{
            window.alert(error)
        })
        return()=>{
            isFistRender = false
        }
    },[id])
    return(
        <>
            <MovieDetailComponent movie={movie}/>
            <ListMovies url={`http://${ip}:8080/api/v1/movie/list-movie?genre=0&id=${id}`} />
        </>
    )

}   