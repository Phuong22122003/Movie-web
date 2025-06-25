//Bổ xung router để thêm các component vào
import Header from "./components/header/header";
import SelectBar from "./components/header/select-bar";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./page/user/home";
import Movie from "./page/user/movie";
import MovieDetail from "./page/user/movie-detail-page";
import ListMovies from "./page/user/list-movies";
import SearchPage from "./page/user/search";
import AddMovie from "./components/admin/add-movie";
import ListMoviesAdded from "./components/admin/list-movie-added";
import AddedMoviePage from "./page/admin/list-added-movie";
import LogIn from "./page/commons/login";
import { GetCookie } from "./utils/cookie";
import SigUp from "./page/commons/sigup";
import Profile from "./page/commons/profile";
import { useEffect, useState } from "react";
import { ip } from "./utils/local-ip";
import CountryPage from "./page/commons/country";
import GenrePage from "./page/commons/genre";

export default function MasterPage() {
    const navigate = useNavigate()
    const [countries,setCountries] = useState([])
    const [genres,setGenres] = useState([])
    useEffect(()=>{
        let isCountriesLoaded = false

        if(!isCountriesLoaded)
        fetch(`http://${ip}:8080/api/v1/countries/list`)
        .then(response=>response.json())
        .then(data=>{
            setCountries(data);
        })
        .catch(error=>{
            console.log(error);
        })
        return (()=>{
            isCountriesLoaded = true
        })
    },[])
    useEffect(()=>{
        let isGenresLoaded = false
        console.log(isGenresLoaded)
        console.log(genres)
        if(!isGenresLoaded)
        fetch(`http://${ip}:8080/api/v1/genres/list`)
        .then(response=>response.json())
        .then(data=>{
            setGenres(data);
        })
        .catch(error=>{
            console.log(error);
        })
        return(()=>isGenresLoaded= true)
    },[])
    const location = useLocation();
    function searchByKeyword(keyword,event){
        if(event.key === 'Enter' ){
            if(keyword.length >0)
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    }
    function logoClick(){
        navigate(`/home`)
    }
    function searchByCountry(id){
        navigate(`quocgia/${id}`)
    }
    function searchByGenre(genre){
        navigate(`theloai/${genre}`)
    }
    function profileHandleClick(){
        if(GetCookie("jwt") === "")
            navigate("/login")
        else
            navigate(`/profile`)
    }
    const SelectBarVar = <SelectBar  genres={genres} countries={countries} searchByGenre= {searchByGenre} searchByCountry = {searchByCountry} />
    return (
        <>
                {(location.pathname !== "/login" && location.pathname !== "/sigup") && (
                    <Header logoClick={logoClick} iconClick={profileHandleClick} onKeyDown={searchByKeyword}>
                    {SelectBarVar}
                    </Header>
                )}
                <Routes>
                    <Route path= "/login" element = { <LogIn />} />
                    <Route path= "/sigup" element = { <SigUp />} />
                    <Route path= "/upload" element = { <AddedMoviePage genres={genres}/>} />
                    <Route path= "/home" element = { <HomePage />}/>
                    <Route path= "/search" element = { <SearchPage/>} />
                    <Route path= "/profile" element = { <Profile />} />
                    <Route path= "/quocgia/:id" element = { <CountryPage />} />
                    <Route path= "/theloai/:genre" element = { <GenrePage />} />
                    <Route path = "/movie/:id" element = {<Movie />}/>
                    <Route path = "/detail/:id" element = {<MovieDetail />}/>
                    <Route path= "/" element = { <HomePage />}/>
                </Routes>
        </>
    )
}