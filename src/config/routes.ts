import IRoute from "../interfaces/iroute"

//Pages
import Home from "../pages/home";
import Movies from "../pages/movies";
import Movie from "../pages/movie";
import Directories from "../pages/directories";
import Directory from "../pages/director";
import NewMovie from "../pages/newmovie";
import NewDirector from "../pages/newdirector";



const routes : IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: Home,
    },
    {
        path: '/Movies',
        name: 'Movies',
        component: Movies,
    },
    {
        path: '/Movies/:number',
        name: 'Movies',
        component: Movie,
    },
    {
        path: '/Movies/NewMovie',
        name: 'Mewmovie',
        component: NewMovie,
    },
    {
        path: '/Directories',
        name: 'Directories',
        component: Directories,
    },
    {
        path: '/Directories/:number',
        name: 'Directories',
        component: Directory,
    },
    {
        path: '/Directories/NewDirector',
        name: 'NewDirector',
        component: NewDirector,
    }
]

export default routes;