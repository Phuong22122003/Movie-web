import ListMovies from "./list-movies";

export default function HomePage(){
    //if id !=0  means get list movies but remove movie have that id 
    return(
        <ListMovies url={'http://localhost:8080/api/v1/movie/list-movie?genre=1&id=0'}></ListMovies>
    )
}