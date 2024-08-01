import "./header.css"
import logo from"../../assets/logo/logo.svg"
import userIcon from "../../assets/icon/user-icon.svg"
import { useRef } from "react"
function Icon({iconClick}){
    return (
        <div onClick={iconClick}>
            <img src={userIcon}></img>
        </div>
    )
}
function Logo({logoClick}){
    return(
        <div className="logo" onClick={logoClick}>
            <img src={logo} alt = "" className="img"/>
            <p>PHIM HAY</p>
        </div>
    )
}
function Search({onKeyDown}){
    const inputRef = useRef(null)
    return(
        <div className="search" onKeyDown={(e)=>onKeyDown(inputRef.current.value,e)}>
            <input ref={inputRef}/>
            {/* <button onClick={()=> buttonClick(inputRef.current.value )}>Search</button> */}
        </div>
    )
}
export default function Header(props){
    return (
        <div className="header">
            <div className="top" >
                <Logo logoClick={props.logoClick} />
                <Search onKeyDown={props.onKeyDown}/>
                <Icon iconClick={props.iconClick} />
            </div>
            {props.children}
        </div>
    )
}
