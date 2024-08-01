import { useRef } from "react"

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