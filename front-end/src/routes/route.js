import { Routes, Route } from "react-router-dom";
import LogIn from "../page/commons/login";
import SigUp from "../page/commons/sigup";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import MovieList from "../page/home/MovieList";
import AdminLayout from "../layout/AdminLayout";
import Admin from "../page/admin/AddMovie";
import MovieDetail from "../page/movie-detail/MovieDetail";
import Movie from "../page/movie-detail/Movie";
export default function AppRoutes() {
  return (
    <Routes>
        {/* parent và child */}
      <Route element={<MainLayout />}> 
        <Route path="/home" element={<MovieList/>}/>
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Route>
      <Route element={<AuthLayout/>}>
        <Route path="/sigup" element={<SigUp />} />
        <Route path="/login" element={<LogIn />} />
      </Route>
      <Route element={<AdminLayout/>}>
        <Route path="/upload" element={<Admin />} />
      </Route>
      
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/search" element={<SearchPage />} /> */}
      {/* <Route path="/movie/:id" element={<Movie />} /> */}
      {/* <Route path="/detail/:id" element={<MovieDetail />} /> */}
      {/* <Route path="/upload" element={<AddedMoviePage />} /> */}
      {/* <Route path="/quocgia/:id" element={<CountryPage />} /> */}
      {/* <Route path="/theloai/:genre" element={<GenrePage />} /> */}
    </Routes>
  );
}
