import { useEffect, useState } from "react"
import ProfileComponent from "../../components/commons/profile"
import {useNavigate} from "react-router-dom"
import { ip } from "../../utils/local-ip";
import { GetCookie } from "../../utils/cookie";
export default function Profile(){

    const [userInfo,setUserInfo] = useState({})
    const navigate = useNavigate()
    const jwt = GetCookie("jwt")
    useEffect(()=>{
        fetch(`http://${ip}:8080/api/v1/user/profile`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`, // Use Bearer schema for the token
            },
        })
        .then(response=>response)
        .then(async response=>{
            if(response.ok){
                let info = await response.json()
                if(info["role"].trim().toLowerCase()==="admin")
                info["isAdmin"] =true
                setUserInfo(info)
            }
        })
    },[])
    if(jwt === "")
        navigate("/login")
    
    function navigateUploadPage(){
        navigate("/upload")
    }
    return (
        <ProfileComponent  handelClick={navigateUploadPage} info={userInfo}></ProfileComponent>
    )
}