
import { useSearchParams } from "react-router-dom";
import ListMovies from "./list-movies";
export default function SearchPage(){
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword'); // Lấy giá trị của tham số 'key'
    return(
        <ListMovies url={'http://localhost:8080/api/v1/movie/search?keyword='+keyword} />
    )
}