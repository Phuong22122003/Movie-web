import { useEffect, useState } from "react";
import { getGenres } from "../service/GenreService";

export function useGenres(){
    const [genres,setGenres] = useState([]);
    useEffect(()=>{
        let isGenresLoaded = false
        console.log(isGenresLoaded)
        console.log(genres)
        if(!isGenresLoaded)
        getGenres()
        .then(data=>{
            setGenres(data);
        })
        .catch(error=>{
            console.log(error);
        })
        return(()=>isGenresLoaded= true)
    },[])
    return genres;
}