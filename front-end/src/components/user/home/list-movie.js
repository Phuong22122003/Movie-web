export default function UserListMovie(listMovie,handClick){
    const items = listMovie.map(item=>
        <div className="item" onClick={handClick}>
            <img src = {item.img} />
            <p>{item.name}</p>
            <p>{item.duration}</p>
        </div>
    )
    return(
        <div>
            {items}
        </div>
    )
}