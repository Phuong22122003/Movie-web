//Bổ xung router để thêm các component vào
import Header from "./components/commons/header";
import SelectBar from "./components/commons/select-bar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./page/user/home";
import Movie from "./page/user/movie";
import MovieDetail from "./page/user/movie-detail-page";
import ListMovies from "./page/user/list-movies";
import SearchPage from "./page/user/search";
const typeOfMovie = [
    {
        link: '/home',
        name: 'Kinh dị'
    }
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
    function searchByKeyword(keyword,event){
        if(event.key === 'Enter' ){
            if(keyword.length >0)
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    }
    function logoClick(){
        navigate(`/home`)
    }
    const SelectBarVar = <SelectBar typeOfMovie={typeOfMovie} countries={countries} />
    return (
        <>
                <Header logoClick={logoClick} iconClick = {()=>window.alert('a')} onKeyDown={searchByKeyword}>
                    {SelectBarVar}
                </Header>
                <Routes>
                    <Route path= "/search" element = { <SearchPage/>} />
                    <Route path= "/home" element = { <HomePage />}/>
                    <Route path = "/movie/:id" element = {<Movie />}/>
                    <Route path = "/detail/:id" element = {<MovieDetail />}/>
                    <Route path= "/" element = { <HomePage />}/>
                </Routes>
        </>
    )
}