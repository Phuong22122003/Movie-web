import "./profile.css"
export default function ProfileComponent({info,movieManagement,logoutHandle}){
    console.log(info)
    return (
        <div className = "profile-wrapper">
            <div className = "text-wrapper">
                <p className = "username">{info.username}</p>
                <p className = "email">{info.email}</p>
                <p className = "role">{info.role}</p>   
                {info.isAdmin&&
                    <span onClick = {movieManagement} className = "video-control">
                        Quản lý phim
                    </span>
                }
                <span onClick = {logoutHandle} className = "video-control">
                    Đăng xuất
                </span>
            </div>
        </div>
    )
}