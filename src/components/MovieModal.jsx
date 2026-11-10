import { useEffect, useState } from "react"
import "./MovieModal.css"

export function MovieModal ({imdbID, onClose}) {
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          setIsLoading(true)
          const apiKey = import.meta.env.VITE_API_KEY
          const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`

          const res = await fetch(url)
          const data = await res.json()

          if (data.Response === "True") {
            setMovie(data)
          }
        } catch (err) {
          console.error("Ошибка при загрузке деталей фильма:", err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchMovieDetails()
    }, [imdbID])


    useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      }
    }, [])

  return (
    <>
    <div className="modal-backdrop" >
     
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">✕</button>

        {isLoading ? (
          <p>Загрузка деталей...</p>
        ) : movie ? (
          <div className="movie-details">
            <img src={movie.Poster} alt={movie.Title} className="modal-poster" />
            <div className="modal-info">
              <h2>{movie.Title} ({movie.Year})</h2>
              <p><b>Жанр:</b> {movie.Genre}</p>
              <p><b>Режиссер:</b> {movie.Director}</p>
              <p><b>Актеры:</b> {movie.Actors}</p>
              <p><b>Рейтинг IMDb:</b> ⭐ {movie.imdbRating}</p>
              <p className="modal-plot"><b>Сюжет:</b> {movie.Plot}</p>
            </div>
          </div>
        ) : (
          <p>Не удалось загрузить информацию.</p>
        )}
      </div>
    </div>
    </>
  )
    
}