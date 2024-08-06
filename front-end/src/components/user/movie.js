import { useRef } from "react"
import "./movie.css"
export default function MovieComponent({movie}){
    return(
        <div>
            <video controls >
                <source
                src={movie.source}
                type="video/mp4"
                />
            </video>
        </div>
    )
}