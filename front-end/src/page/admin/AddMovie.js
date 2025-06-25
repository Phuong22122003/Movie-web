import MovieAdd from "../../components/admin/MovieAdd"
import {useNavigate} from "react-router-dom"
import MovieEdit from "../../components/admin/MovieEdit"
import { ip } from "../../utils/local-ip";
import { GetCookie } from "../../utils/cookie";
import { useGenres } from "../../hooks/useGenres"
import { useCountries } from "../../hooks/useCountries"
import useAdminMovies from "../../hooks/useAdminMovies"
import MovieList from "../../components/admin/MovieList"
import { useState } from "react";

export default function Admin(){
    const genres = useGenres();
    const countries = useCountries();
    const navigate = useNavigate();
    const[ movies ,setMovies] = useAdminMovies();

    const [editComponent,setEditComponent] = useState(null)
    const [addComponent, setAddComponent] = useState(null)

    function deleteVideo(id){
        deleteVideo(id)
        .then(respone=>respone.status)
        .then(status=>{
            if(status === 200){
                let newList = []
                for(let item of movies){
                    console.log(item)
                    if(item.id !== id)
                        newList.push(item)
                }
                setMovies(newList)
            }
        })
        .catch(error =>{
            window.alert('cannot delete')
        })
    }
    function saveVideo(item,input){
        const jwt = GetCookie("jwt")
        console.log(jwt)
        if(jwt == "")navigate("/login")
        console.log(item)
        const data = new FormData()
        data.append("movie",JSON.stringify(item))
        let url  = `http://${ip}:8080/api/v1/manage/update`
        if(input.files[0]!==null){
            data.append("image",input.files[0])
        }
        console.log(data)
        fetch(url,{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${jwt}`, // Use Bearer schema for the token
            },
            body: data
        })
        .then((respone)=>respone)
        .then(async respone =>{
            if(respone.ok){
                setEditComponent(null)
                let responeDetail = await respone.json();
                let newList = []
                for(let moive of movies){
                    if(responeDetail["data"].id === moive.id)
                        newList.push(responeDetail["data"])
                    else newList.push(moive)
                }
                console.log(newList)
                setMovies(newList)
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }
    function addMovie(movieInfo){
        const jwt = GetCookie("jwt")
        console.log(jwt)
        if(jwt == "")navigate("/login")
        console.log(movieInfo)
        const data = new FormData()
        data.append("movieJson",JSON.stringify(movieInfo["movie"]))
        let url  = `http://${ip}:8080/api/v1/manage/add`
        data.append("image",movieInfo["imageFile"])
        data.append("video",movieInfo["movieFile"])
        console.log(data)
        fetch(url,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${jwt}`, // Use Bearer schema for the token
            },
            body: data
        })
        .then((respone)=>respone)
        .then( async respone =>{
            if(respone.ok){
                setAddComponent(null)
                let newList = movies.slice()
                let newMovie = await respone.json();
                newList.push(newMovie["data"])
                setMovies(newList)
            }
        })
        .catch(error =>{
            console.log(error)
            window.alert('log in console')
        })
    }
    function btnEditMovieHandelClick(item){
        setEditComponent(<MovieEdit 
            genres = {genres}
            cancleClick={()=>{setEditComponent(null)}}
            saveVideo={saveVideo}
            item = {item}
        />)
    }
    function btnAddMovieHandleClick(){
        setAddComponent(<MovieAdd
            genres = {genres}
            cancleClick={()=>{setAddComponent(null)}}
            addMovie = {addMovie}
        />)
    }
    return(
        <div>
            <MovieList 
                movies={movies}
                btnEditMovieHandelClick = {btnEditMovieHandelClick}
                deleteVideo = {deleteVideo}
                btnAddMovieHandleClick = {btnAddMovieHandleClick}
            />
            {addComponent&&addComponent}
            {editComponent&&editComponent}
        </div>
    )
}