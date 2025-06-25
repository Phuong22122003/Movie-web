import { ip } from "../utils/local-ip";

export async  function getMovies(){
    const res = await  fetch(`http://${ip}:8080/api/v1/movies/all`);
    return res.json();
}

export async function getMovieDetail(id) {
    const res = await  fetch(`http://${ip}:8080/api/v1/movies/detail?id=${id}`);
    return res.json();
}