import {useState} from "react"
import {Link} from "react-router-dom";
import { ip } from "../../utils/local-ip";
import "./login.css"
export default function LogInComponent(props){
    const [info,setInfo] = useState({
        username:null,
        password:null
    })
    function onChange(e){
        const { name, value } = e.target;
        setInfo(pre=>({
            ...pre,
            [name]:value
        }))
    }
    return (
        <div>
            <div className="background">
            </div>
            <form class="login" method="POST">
                <h1>Đăng nhập</h1>
                <input onChange={onChange} type="text" placeholder="Username" id = "username" name = "username" required></input>
                <input onChange = {onChange} type="password" placeholder="Password" id = "password" name = "password" required></input>
                <button  type = "submit" class="btn" onClick= {(e)=> props.logInHandleClick(e,info)}>Đăng nhập</button>
                <Link to="/sigup" class="sigup">Đăng ký</Link>
                <a href = "http://192.168.1.104:8080/oauth2/authorization/google" >Tiếp tục với google</a>
            </form>
        </div>
    );
}