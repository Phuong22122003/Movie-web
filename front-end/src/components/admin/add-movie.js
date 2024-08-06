import { useRef, useState } from "react";
import "./add-moive.css"
import cancle from "../../assets/common/cancle.svg"
export default function AddMovie(props){
    const videoRef = useRef(null);
    const srcRef = useRef(null);
    const inputVideoRef = useRef(null)
    const inputImageRef = useRef(null)
    const imgRef = useRef(null)
    const [movieInfo,setMovieInfo] = useState(
        {
            movie:{
                name:null,
                description:null
            },
            imageFile: null,
            movieFile: null
        }
    ) 

    const genres = props.genres.map((genre)=>(
        <option>
          {genre.name}
        </option>

    ))
    function playMovie(){
        let file = inputVideoRef.current.files[0]
        if(file!=null)
            setMovieInfo(preInfo=>({
                ...preInfo,
                movieFile: file
            }))
        else return
        let reader = new FileReader();
        reader.onload = function(e){    
            console.log(file)
            let src = e.target.result;
            let video = videoRef.current
            srcRef.current.setAttribute("src",src);
            video.load()
        }
        reader.readAsDataURL(file)
    }
    function showImage(){
        let file =inputImageRef.current.files[0];
        if(file!=null){
            setMovieInfo(preInfo=>({
                ...preInfo,
                imageFile:file 
            }))
        }
        else return
        let reader = new FileReader()
        reader.onload=function(e){
            imgRef.current.setAttribute("src",e.target.result)
        }
        reader.readAsDataURL(inputImageRef.current.files[0])
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieInfo(preInfo => ({
            ...preInfo,
            movie: {
                ...preInfo.movie,
                [name]: value
            }
        }));
    };
    return(
        <div className="upload" >
            <div className="cancle" onClick={props.cancleClick}>
                <img src={cancle} />
            </div>
            <div className="infomation">
                <div className = "title" >
                    <p>Title (required)</p>
                    <input name="name" onChange={handleInputChange}/>
                </div>
                <div>
                    <p>Description</p>
                    <input name="description" onChange={handleInputChange} />
                </div>
                <div>
                    <p>Genre</p>
                    <select>
                        {genres}
                    </select>
                </div>
                <div className="btnSaveWrapper">
                    <span className="btnSave" onClick={()=>props.addMovie(movieInfo)}>Save</span>
                </div>
            </div>
            <div className = "video-wrapper">
                <img className="thumbnail-image" ref={imgRef}   />
                <p>
                    Upload image
                    <input className="input-img" ref={inputImageRef} type="file" accept="image/*" onChange={showImage}></input>
                </p>
                <video ref={videoRef} className="video"  controls>
                    <source ref={srcRef}>
                    </source>
                </video>
                <input type = "file" accept = "video/*" ref={inputVideoRef} onChange={()=>playMovie(this)}/>
            </div>
        </div>
    )
}