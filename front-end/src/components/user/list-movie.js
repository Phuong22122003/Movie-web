import "./list-movie.css"
export default function ListMoviesComponent({listMovie,handleClick}){
    console.log(listMovie)
    function handleClickInside(id){
        handleClick(id)
    }
    const items = listMovie.map((item,key)=>
        <div key={key} className="item" onClick={()=>handleClickInside(item.id)}>
            <img src = {item.imagePath} />
            <p >{item.name}</p>
        </div>
    )
    return(
        <div className = "listMovie">
            {items}
        </div>
    )
}