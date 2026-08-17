import { Link } from 'react-router-dom'

export default function LabsBridge() {
  return (
    <section id="bridge" className="bridge section-pad">
      <div className="wrap">
        <div className="reveal">
          <div className="label"><span>From experiment</span><span aria-hidden="true">&rarr;</span><span>Application</span></div>
          <div className="b-row">
            <h2>Some ideas stay in the lab.<br /><em>Some become the way we build.</em></h2>
            <div>
              <p>When an experiment proves useful, it informs real products, systems and client work over at the studio.</p>
              <Link to="/" className="b-cta">See how Aura Digital applies it &#8599;</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
