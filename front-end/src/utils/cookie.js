export function SetCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function GetCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}

export function CheckCookie() {
    let user = GetCookie("username");
    if (user != "") {
    alert("Welcome again " + user);
    } else {
    user = prompt("Please enter your name:","");
    if (user != "" && user != null) {
        SetCookie("username", user, 30);
    }
    }
}

export function DeleteCookie(cname) {
    // Thiết lập ngày hết hạn cookie trong quá khứ
    const d = new Date();
    d.setTime(d.getTime() - 1);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}
