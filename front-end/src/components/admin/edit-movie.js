import { useRef, useState } from "react";
import "./add-moive.css"
import cancle from "../../assets/common/cancle.svg"
export default function EditMovie(props){
    const inputRef = useRef(null)
    const imgRef = useRef(null)
    function showImage(){
        let reader = new FileReader()
        reader.onload=function(e){
            imgRef.current.setAttribute("src",e.target.result)
        }
        reader.readAsDataURL(inputRef.current.files[0])
    }
    const [movie, setMovie] = useState(props.item);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };
    const genres = props.genres.map((genre)=>(
        <option>
          {genre.name}
        </option>

    ))
    return(
        <div className="upload">
            <div className="cancle" onClick={props.cancleClick}>
                <img src={cancle} />
            </div>
            <div className="infomation">
                <div className = "title" >
                    <p>Title (required)</p>
                    <input  name="name"
                        value={movie.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <p>Description</p>
                    <input
                        name="description"
                        value={movie.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <p>Genre</p>
                    <select>
                        {genres}
                    </select>
                </div>
                <div className="btnSaveWrapper">
                    <span className="btnSave" onClick = {()=>props.saveVideo(movie,inputRef.current)}>Save</span>
                </div>
            </div>
            <div className = "video-wrapper">
                <img className="thumbnail-image" ref={imgRef}  src = {props.item.imagePath} />
                <p>
                    Upload image
                    <input className="input-img" ref={inputRef} type="file" accept="image/*" onChange={showImage}></input>
                </p>
                <video className="video"  controls>
                    <source src={props.item.source} controls>
                    </source>
                </video>
            </div>
        </div>
    )
}