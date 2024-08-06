import "./select-bar.css"
import "./default.css"
export default function SelectBar(props) {
    const listTypeOfMovie = props['typeOfMovie'].map((type,key) =>
        <li key={key}>
            <a href={type.link}>{type.name}</a>
        </li>
    )
    const listCountry = props['countries'].map((contry,key) =>
        <li key={key}>
            <a href={contry.link}>{contry.name}</a>
        </li>
    )
    return (

        <ul className="listItem">
            <li key = {1}><a href="/home">Trang chủ</a></li>
            <li key = {2}>
                <p>
                    Thể loại
                </p>
                <ul className="subList">
                    {listTypeOfMovie}
                </ul>
            </li>
            <li key = {3}>
                <p>
                    Quốc gia
                </p>
                <ul className="subList">
                    {listCountry}
                </ul>
            </li>
            <li key = {4}>
                <a href="/phimbo">Phim bộ</a>
            </li>
            <li key = {5}>
                <a href="/phimle">Phim lẻ</a>
            </li>
        </ul>

    )
}