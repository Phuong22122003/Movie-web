import { GetCookie } from "../utils/cookie";
import { ip } from "../utils/local-ip";

export async  function getAllMovies(){
    const jwt = GetCookie("jwt")
    console.log(jwt)
    const res = await  fetch(`http://${ip}:8080/api/v1/manage/movies`,
            {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`, // Use Bearer schema for the token
                },
            }
    );
    return res.json();
}

export async function deleteVideo(id){
    const jwt = GetCookie("jwt")
    const res = await fetch(`http://${ip}:8080/api/v1/manage/delete/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`, // Use Bearer schema for the token
        },
    });
    return res;
}

