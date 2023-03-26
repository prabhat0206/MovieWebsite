import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/header/header';
import Home from "./pages/home/home";
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetails/movieDetails';
import Login from './pages/login/Login';
import Register from './pages/login/Register';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie/>}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
        
    </div>
  );
}

export default App;
