export default function SelectBar(props) {
    console.log(props)
    const listTypeOfMovie = props['typeOfMovie'].map(type =>
        <li>
            <a href={type.link}>{type.name}</a>
        </li>
    )
    const listCountry = props['countries'].map(contry =>
        <li>
            <a href={contry.link}>{contry.name}</a>
        </li>
    )
    return (

        <ul className="list-item" style={{display:'flex',justifyContent : 'space-between' ,alignItems:'center'}}>
            <li><a href="/home">Trang chủ</a></li>
            <li>
                <p>
                    Thể loại
                </p>
                <ul style={{display:'none' ,padding:'0px'}}>
                    {listTypeOfMovie}
                </ul>
            </li>
            <li>
                <p>
                    Quốc gia
                </p>
                <ul style={{ position:'fixed',padding:'0px'}}>
                    {listCountry}
                </ul>
            </li>
            <li>
                <a href="/phimbo">Phim bộ</a>
            </li>
            <li>
                <a href="/phimle">Phim lẻ</a>
            </li>
        </ul>

    )
}