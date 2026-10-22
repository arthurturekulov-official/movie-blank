import { useState } from "react"

function App() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])

  const handleSearchMovie = async (e) => {
    e.preventDefault() 

    if (!query.trim()) return

    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.Response === "True") {
        setMovies(data.Search)
      } else {
        setMovies([])
        console.log(data.Error)
      }
    } catch (err) {
      console.error("Ошибка запроса:", err)
    }
  }
  
  return (
    <>
      <form onSubmit={handleSearchMovie}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Найти фильм:"
        />
        <button type="submit">Найти</button>
      </form>

      <div>
        {movies.map((movie) => (
          <>
            <h3 key={movie.imdbID}>{movie.Title}</h3>
            <img src={movie.Poster} alt={movie.Title} />
          </>
        ))}
      </div>
    </>
  )
}

export default App