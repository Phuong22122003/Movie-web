import "./select-bar.css";
import "../commons/default.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGenres } from "../../service/GenreService";
import { getCountries } from "../../service/CountryService";
function useContries(){
    const [countries,setCountries] = useState([]);
    useEffect(()=>{
        let isCountriesLoaded = false
        if(!isCountriesLoaded)
        getCountries()
        .then(setCountries)
        .catch(console.error)
        return (()=>{
            isCountriesLoaded = true
        })
    },[]);
    return countries;
}
function useGenres(){
    const [genres,setGenres] = useState([]);
    useEffect(()=>{
        let isGenresLoaded = false
        console.log(isGenresLoaded)
        console.log(genres)
        if(!isGenresLoaded)
        getGenres()
        .then(data=>{
            setGenres(data);
        })
        .catch(error=>{
            console.log(error);
        })
        return(()=>isGenresLoaded= true)
    },[])
    return genres;
}
export default function SelectBar() {
    const countries = useContries();
    const genres = useGenres();
    const navigate = useNavigate();

    const handleGenreClick = (genrePath) => {
        navigate(`theloai/${genrePath}`);
    };

    const handleCountryClick = (countryId) => {
        navigate(`quocgia/${countryId}`);
    };

  return (
    <ul className="listItem">
      <li><Link to="/home">Trang chủ</Link></li>

      <li>
        <p>Thể loại</p>
        <ul className="subList">
          {genres.map((type) => (
            <li key={type.name}>
              <button onClick={() => handleGenreClick(type.name)} className="link-button">
                {type.name}
              </button>
            </li>
          ))}
        </ul>
      </li>

      <li>
        <p>Quốc gia</p>
        <ul className="subList">
          {countries.map((country) => (
            <li key={country.id}>
              <button onClick={() => handleCountryClick(country.id)} className="link-button">
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      </li>

      <li><Link to="/phimbo">Phim bộ</Link></li>
      <li><Link to="/phimle">Phim lẻ</Link></li>
    </ul>
  );
}
