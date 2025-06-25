import { ip } from "../utils/local-ip";

export async  function getCountries(){
    const res = await  fetch(`http://${ip}:8080/api/v1/countries/list`)
    return res.json();
}