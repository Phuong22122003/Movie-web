import ListAddedMoviesComponent from "../../components/admin/list-movie-added"
import AddMovie from "../../components/admin/add-movie"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import EditMovie from "../../components/admin/edit-movie"
import { ip } from "../../utils/local-ip";
export default function AddedMoviePage({genres}){

    const [listAddedMovie,setListAddedMovie] = useState([])
    const [editComponent,setEditComponent] = useState(null)
    const [addComponent, setAddComponent] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        fetch('http://localhost:8080/api/v1/manage/movies')
        .then(async respone =>{
            return respone.json()
        })
        .then(data=>{
            setListAddedMovie(data)
        })
        .catch(error=> console.log(error))
    },[])
    function deleteVideo(id){
        fetch('http://localhost:8080/api/v1/manage/delete/'+id,{
            method:'DELETE',
        })
        .then(respone=>respone.status)
        .then(status=>{
            if(status === 200){

                let newList = []
                for(let item of listAddedMovie){
                    console.log(item)
                    if(item.id !== id)
                        newList.push(item)
                }
                setListAddedMovie(newList)
            }
        })
        .catch(error =>{
            window.alert('cannot delete')
        })
    }
    function playVideo(id){
        navigate('/movie/'+id)
    }
    function saveVideo(item,input){
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
            body: data
        })
        .then((respone)=>respone)
        .then(async respone =>{
            if(respone.ok){
                setEditComponent(null)
                let responeDetail = await respone.json();
                let newList = []
                for(let moive of listAddedMovie){
                    if(responeDetail["data"].id === moive.id)
                        newList.push(responeDetail["data"])
                    else newList.push(moive)
                }
                console.log(newList)
                setListAddedMovie(newList)
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }
    function addMovie(movieInfo){
        console.log(movieInfo)
        const data = new FormData()
        data.append("movieJson",JSON.stringify(movieInfo["movie"]))
        let url  = `http://${ip}:8080/api/v1/manage/add`
        data.append("image",movieInfo["imageFile"])
        data.append("video",movieInfo["movieFile"])
        console.log(data)
        fetch(url,{
            method:'POST',
            body: data
        })
        .then((respone)=>respone)
        .then( async respone =>{
            if(respone.ok){
                setAddComponent(null)
                let newList = listAddedMovie.slice()
                let newMovie = await respone.json();
                newList.push(newMovie["data"])
                setListAddedMovie(newList)
            }
        })
        .catch(error =>{
            console.log(error)
            window.alert('log in console')
        })
    }
    function btnEditMovieHandelClick(item){
        setEditComponent(<EditMovie 
            genres = {genres}
            cancleClick={()=>{setEditComponent(null)}}
            saveVideo={saveVideo}
            item = {item}
        />)
    }
    function btnAddMovieHandleClick(){
        setAddComponent(<AddMovie
            genres = {genres}
            cancleClick={()=>{setAddComponent(null)}}
            addMovie = {addMovie}
        />)
    }
    return(
        <div>
            <ListAddedMoviesComponent 
                movies={listAddedMovie}
                playVideo = {playVideo}    
                btnEditMovieHandelClick = {btnEditMovieHandelClick}
                deleteVideo = {deleteVideo}
                btnAddMovieHandleClick = {btnAddMovieHandleClick}
            />
            {addComponent&&addComponent}
            {editComponent&&editComponent}
        </div>
    )
}