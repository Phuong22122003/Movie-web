import ListMovies from "./list-movies";
import { ip } from "../../utils/local-ip";
export default function HomePage(){
    //if id !=0  means get list movies but remove movie have that id 
    return(
        <ListMovies url={`http://${ip}:8080/api/v1/movie/list-movie?genre=0&id=0`}></ListMovies>
        // <ListMovies url={'http://localhost:8080/api/v1/movie/list-movie?genre=1&id=0'}></ListMovies>
    )
}