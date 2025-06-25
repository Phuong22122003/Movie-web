import { useNavigate, useParams } from "react-router-dom";
import MovieDetailComponent from "../../components/user/movie-detail";
import CommentComponent from "../../components/user/comment";
import MovieComponent from "../../components/user/movie";
import { useEffect, useState } from "react";
import { ip } from "../../utils/local-ip";
import { GetCookie } from "../../utils/cookie";
import MovieList from "../home/MovieList";

export default function Movie(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [movie,setMovie] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [comments,setComments] = useState([{}])
      const token = GetCookie("jwt")
    let isFirstReder = true;
    useEffect(()=>{
        if(isFirstReder)
        fetch(`http://${ip}:8080/api/v1/movies/get?id=${id}`)
        .then(respone=>respone.json())
        .then((data)=>{
            setMovie(data)
            console.log(movie)
            setIsLoading(false)
            console.log(data.listComment.length)
            if(data.listComment.length>10){
                const newListComment = data.listComment.slice(0,10);
                console.log(data.listComment.slice(0,10))
                setComments(newListComment)
            }
            else 
             setComments(data.listComment)
        })
        .catch(error=>{
            console.log(error)
        })
        return ()=>{
            isFirstReder = false
        }
    },[id])
    function sendComment(inputRef,setInputValue){
        let jwt = GetCookie("jwt")
        if(jwt === ""){
            navigate("/login")
            return;
        } 
        if(inputRef.value.trim().length === 0){
            inputRef.focus()
            console.log(inputRef.value)
            return;
        }
        let data = {
            usename: '',
            movieId: id,
            commentDate: null,
            comment:inputRef.value
        }
        fetch(`http://${ip}:8080/api/v1/user/comment`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use Bearer schema for the token
            },
            body: JSON.stringify(data)

        })
        .then(respone => respone)
        .then(respone =>{
            if(respone.ok){
                return respone.json();
            }
        })
        .then(data=>{
            const newListComment = [data,...comments.slice()]
            // newListComment.push(data)
            setComments(newListComment)
            setInputValue("")
        })
        .catch(error =>{
            console.log(error);
        })
        console.log(inputRef.value)
    }
    return(
        <div>
            {isLoading? <h2 style={{color:'white'}}>loading</h2>:<MovieComponent movie={movie}></MovieComponent>}
            {isLoading?
                <h2> loading</h2>:
                <CommentComponent
                    listComment={comments}
                    sendComment = {sendComment}
                />
            }

            <h2 style={{color:'white'}}>Có thể bạn cũng thích</h2>
            {!isLoading&&<MovieList></MovieList>}
            
        </div>
    )
}