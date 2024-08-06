import { useNavigate } from "react-router-dom";
import LogInComponent from "../../components/commons/login";
import { SetCookie } from "../../utils/cookie";
import { ip } from "../../utils/local-ip";
export default function LogIn(){
    const navigate = useNavigate()
    function logInHandleClick(e,info){
        e.preventDefault()
        if(info["username"] === "" || info["password"] ==="") return
        fetch(`http://${ip}:8080/api/v1/authenticate/login`,{
            method:'POST',
            headers:{
                "Content-type":"application/json",
            },
            body: JSON.stringify(info)
        })
        .then(response =>response)
        .then(async response=>{
            if(response.ok){
                let jwt = await response.text();
                console.log(jwt)
                SetCookie("jwt",jwt,7);
                navigate('/home')
            }
        })
        .catch(error=>console.log(error))
    }
    return (
        <LogInComponent logInHandleClick = {logInHandleClick}></LogInComponent>
    )
}