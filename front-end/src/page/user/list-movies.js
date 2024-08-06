
import  {useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ListMoviesComponent from "../../components/user/list-movie";

export default  function ListMovies({url}){
    const [listMovie,setListMovie] = useState([])
    let isFistRender = true
    useEffect(()=>{
        if(isFistRender)
            // url('http://localhost:8080/api/v1/movie/list-movie?genre=' + genre +'&id='+id)
        fetch(url)
        .then(resone=>resone.json())
        .then(data=>{
            setListMovie(data)
        })
        .catch(error=>{
            // window.alert(error)
            console.log(error)
        })
        return ()=>{
            isFistRender =false
        }
    },[url])
    const navigate = useNavigate();
    function handleClick(id){
        navigate("/detail/" + id)
    }
    return(
        <ListMoviesComponent listMovie = {listMovie} handleClick = { handleClick}/>  
    )
}