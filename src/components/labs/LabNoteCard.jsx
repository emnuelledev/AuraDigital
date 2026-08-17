export default function LabNoteCard({ n }) {
  return (
    <article className="note reveal" data-cursor>
      <div className="cat">{n.cat}</div>
      <h4>{n.title}</h4>
      <p>{n.excerpt}</p>
      <div className="read">Note · reflection</div>
    </article>
  )
}
