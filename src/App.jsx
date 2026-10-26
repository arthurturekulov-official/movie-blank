import { useState } from "react"
import Loader from "./components/Loader"

function App() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [isLoad, setLoad] = useState(false)

  const handleSearchMovie = async (e) => {
    e.preventDefault() 

    if (!query.trim()) return

    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`

    try {
      setLoad(true)
      const res = await fetch(url)
      const data = await res.json()

      if (data.Response === "True") {
        setQuery("")
        setTimeout(() => {
          setMovies(data.Search)
          setLoad(false)
        }, 2000);
        
      } else {
        setMovies([])
        setLoad(false)
        console.log(data.Error)
      }
    } catch (err) {
      console.error("Ошибка запроса:", err)
    } 
  }
  
  return (
    <div className="app-container">
      <h1>Search Films</h1>
      
      <form onSubmit={handleSearchMovie} className="search-form">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Введите название фильма..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Найти
        </button>
      </form>

      {isLoad && 
        <div className="loader-container">
          <Loader/>
        </div>
      }

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <div className="poster-container">
              {movie.Poster !== "N/A" ? (
                <img 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  className="movie-poster"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="no-poster">🖼 Постер отсутствует</span>
              )}
            </div>

            <div className="movie-info">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">{movie.Year}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App