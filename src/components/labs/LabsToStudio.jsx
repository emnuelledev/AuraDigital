import { Link } from 'react-router-dom'

export default function LabsToStudio() {
  return (
    <section className="to-studio section-pad">
      <div className="wrap">
        <div className="reveal">
          <div className="freq">Different disciplines &middot; One spectrum</div>
          <h2>One studio. <span className="grad">Multiple frequencies.</span></h2>
          <p>Aura Digital Labs is the experimental frontier. Aura Digital is where the useful frequencies become real work.</p>
          <Link to="/" className="s-cta">&larr; Back to the studio</Link>
        </div>
      </div>
    </section>
  )
}
