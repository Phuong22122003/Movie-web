import { useParams } from "react-router-dom"
import { ip } from "../../utils/local-ip"
import ListMovies from "../user/list-movies"

export default function GenrePage(){
    const { genre } = useParams()//get id on url
    return  <ListMovies url={`http://${ip}:8080/api/v1/movie/theloai/${genre}`} />
}