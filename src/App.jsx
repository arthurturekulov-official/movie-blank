import { useEffect } from "react"

function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Ответ от OMDb API:", data);
        if (data.Response === "True") {
          console.log("✅ Ключ работает! Фильмы успешно получены:", data.Search);
        } else {
          console.log("❌ Ошибка от API:", data.Error);
        }
      })
      .catch(err => console.error("Ошибка сети:", err));
  }, [])
  
  return (
    <>
     
    </>
  )
}

export default App
