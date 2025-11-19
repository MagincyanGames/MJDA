import { useEffect, useMemo, useState } from 'react'
import type { TouchEvent } from 'react'
import GameTileExtended from './GameTileExtended'
import './HomeCarousel.css'

interface CarouselItem {
  type: 'game' | 'award'
  id: string
  title: string
  cover?: string
  synopsis?: string
}

interface HomeCarouselProps {
  items: CarouselItem[]
}

// Simple responsive carousel that organizes items into slides of N cards.
export default function HomeCarousel({ items }: HomeCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slides = useMemo(() => items.map((it) => [it]), [items])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % Math.max(1, slides.length)), 4500)
    return () => clearInterval(t)
  }, [slides, paused])

  // Ensure index is valid when slides count changes
  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [slides])

  // Set a random start index when slides are first created
  useEffect(() => {
    if (slides.length > 0) setIndex(Math.floor(Math.random() * slides.length))
  }, [slides.length])

  if (!items || items.length === 0) return null

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const onTouchStart = (e: TouchEvent) => setTouchStart(e.touches?.[0]?.clientX ?? null)
  const onTouchEnd = (e: TouchEvent) => {
    const end = e.changedTouches?.[0]?.clientX ?? null
    if (touchStart == null || end == null) return
    const delta = end - touchStart
    if (Math.abs(delta) > 40) {
      if (delta < 0) goNext()
      else goPrev()
    }
    setTouchStart(null)
  }

  const slideFraction = slides.length > 0 ? 100 / slides.length : 100
  return (
    <div className="home-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="carousel-controls">
        <button aria-label="Prev" className="carousel-btn prev" onClick={goPrev}>‹</button>
        <button aria-label="Next" className="carousel-btn next" onClick={goNext}>›</button>
      </div>
      <div className="slides" role="region" aria-roledescription="carousel" aria-label="Featured games and awards">
        <div className="slides-inner" style={{ width: `${slides.length * 100}%`, transform: `translateX(${ -index * slideFraction }%)`, transition: 'transform 450ms cubic-bezier(.2,.9,.2,1)', ['--slides' as any]: slides.length }}>
          {slides.map((slide, sidx) => (
            <div key={sidx} className="slide" aria-hidden={sidx !== index}>
              <div className="slide-content">
                {slide.map((it) => (
                  <div key={it.type + it.id} className="slide-item">
                        {it.type === 'game' ? (
                          <GameTileExtended id={it.id} name={it.title} cover={it.cover} synopsis={it.synopsis} />
                        ) : (
                          <GameTileExtended id={it.id} name={it.title} synopsis={it.synopsis} isAward />
                        )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
