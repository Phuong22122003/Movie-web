import "./header.css";
import logo from "../../assets/logo/logo.svg";
import userIcon from "../../assets/icon/user-icon.svg";
import SelectBar from "./select-bar";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { GetCookie } from "../../utils/cookie"; // Giả sử bạn có hàm này

function Icon() {
  const navigate = useNavigate();

  function profileHandleClick() {
    if (GetCookie("jwt") === "")
      navigate("/login");
    else
      navigate("/profile");
  }

  return (
    <div onClick={profileHandleClick}>
      <img src={userIcon} alt="User Icon" />
    </div>
  );
}

function Logo() {
  const navigate = useNavigate();

  function logoClick() {
    navigate("/home");
  }

  return (
    <div className="logo" onClick={logoClick}>
      <img src={logo} alt="Logo" className="img" />
      <p>PHIM HAY</p>
    </div>
  );
}

function Search() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function searchByKeyword(keyword, event) {
    if (event.key === "Enter") {
      if (keyword.length > 0) {
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
      }
    }
  }

  return (
    <div
      className="search"
      onKeyDown={(e) => searchByKeyword(inputRef.current.value, e)}
    >
      <input className="header-input" ref={inputRef} placeholder="Tìm kiếm..." />
    </div>
  );
}

export default function Header() {
  return (
    <div className="header">
      <div className="top">
        <Logo />
        <Search />
        <Icon />
      </div>
      <SelectBar/>
    </div>
  );
}
