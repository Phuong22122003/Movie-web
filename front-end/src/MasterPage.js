//Bổ xung router để thêm các component vào
import Header from "./components/commons/header";
import SelectBar from "./components/commons/select-bar";
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
const typeOfMovie = [
    {
        link: '/theloai/kinhdi',
        name: 'Kinh dị'
    },
    {
        link: '/theloai/hai',
        name: 'Hài'
    },
    {
        link: '/theloai/hanhdong',
        name: 'Hành động'
    },
    {
        link: '/theloai/ma',
        name: 'Ma'
    },
]
const countries = [
    {
        link: '/home/vietnam',
        name: 'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name: 'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name: 'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name: 'Việt Nam'
    },

]
export default function MasterPage() {
    const navigate = useNavigate()
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
    function profileHandleClick(){
        if(GetCookie("jwt") === "")
            navigate("/login")
        else
            navigate(`/profile`)
    }
    const SelectBarVar = <SelectBar typeOfMovie={typeOfMovie} countries={countries} />
    return (
        <>
                {(location.pathname !== "/login" && location.pathname !== "/sigup") && (
                    <Header logoClick={logoClick} iconClick={profileHandleClick} onKeyDown={searchByKeyword}>
                    <SelectBar typeOfMovie={typeOfMovie} countries={countries} />
                    </Header>
                )}
                <Routes>
                    <Route path= "/login" element = { <LogIn />} />
                    <Route path= "/sigup" element = { <SigUp />} />
                    <Route path= "/upload" element = { <AddedMoviePage genres={typeOfMovie}/>} />
                    <Route path= "/profile" element = { <Profile />} />
                    <Route path= "/search" element = { <SearchPage/>} />
                    <Route path= "/home" element = { <HomePage />}/>
                    <Route path = "/movie/:id" element = {<Movie />}/>
                    <Route path = "/detail/:id" element = {<MovieDetail />}/>
                    <Route path= "/" element = { <HomePage />}/>
                </Routes>
        </>
    )
}