import { Link } from 'react-router-dom'
import './GameTileExtended.css'

interface GameTileExtendedProps {
  id?: string
  name: string
  cover?: string
  synopsis?: string
  isAward?: boolean
}

export default function GameTileExtended({ id, name, cover, synopsis, isAward = false }: GameTileExtendedProps) {
  const coverStyle = cover ? { backgroundImage: `url(${cover})` } : undefined
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    id && !isAward ? <Link to={`/games/${id}`} className="gtex-link">{children}</Link> : <div className="gtex-link">{children}</div>
  )

  return (
    <Wrapper>
      <article className={`game-tile-extended ${isAward ? 'is-award' : ''}`} aria-labelledby={`gtex-${id}`}>
        <div className="gtex-left">
          <div className="gtex-cover" style={coverStyle}></div>
        </div>
        <div className="gtex-right">
          <h3 id={`gtex-${id}`}>{name}</h3>
          {synopsis ? <p className="gtex-synopsis">{synopsis}</p> : null}
        </div>
      </article>
    </Wrapper>
  )
}
