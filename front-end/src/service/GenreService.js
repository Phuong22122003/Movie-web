import { ip } from "../utils/local-ip";

export async function getGenres(){
    const res = await  fetch(`http://${ip}:8080/api/v1/genres/list`);
    return res.json();
}