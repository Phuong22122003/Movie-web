import { useEffect, useState } from "react";
import { getAllMovies } from "../service/AdminService";

export default function useAdminMovies(){
    const [movies,setMoives] = useState([]);
    useEffect(()=>{
        let isFirstRender = true
        if(isFirstRender)
        getAllMovies()
        .then(movies=>{
            setMoives(movies);
            console.log(movies)
        })
        .catch(error=> console.log(error))

        return(()=>{
            isFirstRender=false
        })
    },[])
    return [movies,setMoives];
}