import "./header.css"
import logo from"../../assets/logo/logo.svg"
import SelectBar from "./select-bar"
function Icon(){
    return (
        <div>
            Icon
        </div>
    )
}
function Logo(){
    return(
        <div style={{display:'flex',gap:'10px'}}>
            <img src={logo} alt = "" className="img"/>
            <p>PHIM HAY</p>
        </div>
    )
}
function Search(){
    return(
        <div>
            <input />
            <button>Search</button>
        </div>
    )
}
export default function Header(props){
    // window.alert('a')
    return (
        <div className="header">
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Logo />
                <Search />
                <Icon />
            </div>
            {props.children}
        </div>
    )
}
