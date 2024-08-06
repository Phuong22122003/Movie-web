import { useNavigate } from "react-router-dom"
import SigUpComponent from "../../components/commons/sigup"
import {ip} from "../../utils/local-ip.js"
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export default function SigUp(){
    const navigate = useNavigate()
    function sigUpHandleClick(e,info){
        e.preventDefault()
        console.log(info)
        if(info["username"] === null||info["password"] ===null||info["username"] ===null)return
        if(!isValidEmail(info["email"]))return
        fetch(`http://${ip}:8080/api/v1/authenticate/sigup`,{
            method:"POST",
            headers:{
                    "Content-type":"application/json",
                },
            body: JSON.stringify(info)
            
        })
        .then(response => response)
        .then(async response=>{
            if(response.ok){
                navigate("/login")
            }   
            else{
                let text = await response.text()
                window.alert(text);
            }
        })
    }
    return(
        <SigUpComponent sigUpHandleClick = {sigUpHandleClick} />
    )
}