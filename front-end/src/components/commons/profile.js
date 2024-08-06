import "./profile.css"
export default function ProfileComponent({info,handelClick}){
    console.log(info)
    return (
        <div className = "profile-wrapper">
            <div className = "text-wrapper">
                <p className = "name">{info.username}</p>
                <p className = "email">{info.email}</p>
                <p className = "role">{info.role}</p>   
                {info.isAdmin&&
                    <span onClick = {handelClick} className = "video-control">
                        Quản lý video
                    </span>
                }
            </div>
        </div>
    )
}