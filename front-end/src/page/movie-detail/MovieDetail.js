import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import MovieDetailComponent from "../../components/user/movie-detail"
import { ip } from "../../utils/local-ip";
import MovieList from "../home/MovieList";
import useMovieDetail from "../../hooks/useMovieDetail";
export default function MovieDetail(){
    const { id } = useParams()//get id on url
    const movie = useMovieDetail(id);
    return(
        <>
            <MovieDetailComponent movie={movie}/>
            <MovieList />
        </>
    )

}   