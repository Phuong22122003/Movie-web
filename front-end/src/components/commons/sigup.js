import {useState} from "react"
import "./login.css"
import error from "../../assets/common/error.svg"
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export default function SigUpComponent(props){
    const [info,setInfo] = useState({
        username:null,
        email: null,
        password:null
    })
    function onChange(e){
        const { name, value } = e.target;
        if(name === "email"&&!isValidEmail(value)){
            setInfo(pre=>({
                ...pre,
                [name]:null
            }))
            return;
        }

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
                <h1>Đăng ký</h1>
                <div className="input-wrapper">
                    <input onChange={onChange} type="text" placeholder="Username" id = "username" name = "username" required></input>
                    {!info.username&& <img src={error}/>}
                </div>
                <div className="input-wrapper">
                    <input onChange = {onChange} type="password" placeholder="Password" id = "password" name = "password" required></input>
                    {!info.password&&<img src={error}/>}
                </div>
                <div className="input-wrapper">
                    <input onChange = {onChange} type="email" placeholder="Email" id = "email" name = "email" required></input>
                   {!info.email &&<img src={error}/>}
                </div>
                <button  type = "submit" class="btn" onClick= {(e)=> props.sigUpHandleClick(e,info)}>Đăng ký</button>
            </form>
        </div>
    );
}