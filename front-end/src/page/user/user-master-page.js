import Header from "../../components/commons/header";
import SelectBar from "../../components/commons/select-bar";
import UserListMovie from "../../components/user/home/list-movie";

const typeOfMovie = [
    {
        link:'/home',
        name: 'Kinh dị'
    }
]
const countries = [
    {
        link: '/home/vietnam',
        name:'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name:'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name:'Việt Nam'
    },
    {
        link: '/home/vietnam',
        name:'Việt Nam'
    },

]
const SelectBarVar = <SelectBar typeOfMovie = {typeOfMovie} countries = {countries} />

export default function UserMasterPage(){
    return(
        <div>
                <Header>
                   {SelectBarVar}
                 </Header>
        </div>
    )
}
// <UserListMovie /> 