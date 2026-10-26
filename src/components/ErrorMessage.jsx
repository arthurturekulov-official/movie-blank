import "./ErrorMessage.css"

export default function ErrorMessage() {
  return (
    <div className="error-container">
      <video 
        src="/clapperboard.mp4" 
        autoPlay
        loop
        muted 
        playsInline 
        className="animated-icon"
      />
      <p>По вашему запросу ничего не найдено</p>
    </div>
  )
}