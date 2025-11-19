// No imports: top-level doesn't need to import React in modern JSX runtime
// import Link not used on home page any more
import { useEffect, useState } from 'react'
// Reintroduce data fetching to show a featured game in the hero
import './Home.css'
import HomeCarousel from '../components/HomeCarousel'

// Home page doesn't fetch content; it only shows action buttons.

interface Game { id: string; name: string; cover?: string; synopsis?: string }
interface Award { id: string; name?: string; title?: string; description?: string; nominees?: string[] }

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [awards, setAwards] = useState<Award[]>([])
  const [carouselItems, setCarouselItems] = useState<{ type: 'game'|'award'; id: string; title: string; cover?: string; synopsis?: string }[]>([])

  useEffect(() => {
    fetch('/data/games.json')
      .then((r) => r.json())
      .then((g) => setGames(g))
      .finally(() => setLoading(false))
    fetch('/data/awards.json')
      .then((r) => r.json())
      .then(setAwards)
      .catch(() => setAwards([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Build carousel items when games or awards change and shuffle once
    const items: { type: 'game'|'award'; id: string; title: string; cover?: string; synopsis?: string }[] = []
    for (let i = 0; i < Math.min(12, games.length); i++) {
      const g = games[i]
      items.push({ type: 'game', id: g.id, title: g.name, cover: g.cover, synopsis: g.synopsis })
    }
    for (let i = 0; i < Math.min(8, awards.length); i++) {
      const a = awards[i]
      items.push({ type: 'award', id: a.id || `award-${i}`, title: a.name || a.id, synopsis: a.description || (a.nominees || []).slice(0,3).join(', ') })
    }
    // fisher-yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = items[i]
      items[i] = items[j]
      items[j] = tmp
    }
    // Schedule the state update to next tick to avoid synchronous state updates during effect
    setTimeout(() => setCarouselItems(items), 0)
  }, [games, awards])

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <h1>MJDA — Melhores Jogos Do Ano</h1>
          <p>Premios de Videojuegos. Celebramos innovación, arte y diseño — descubre los mejores juegos nominados este año.</p>
        </div>
      </section>

      <section className="home-cta">
        <div className="hero-featured"></div>
      </section>

      <section className="home-carousel-wrap">
        {loading ? (
          <div className="hero-placeholder">Cargando carousel...</div>
        ) : (
          <HomeCarousel items={carouselItems} />
        )}
      </section>
    </main>
  )
}
