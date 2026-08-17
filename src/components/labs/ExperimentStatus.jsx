export default function ExperimentStatus({ status }) {
  const cls = 'st-' + status.toLowerCase().replace(/[^a-z]+/g, '-')
  return (
    <span className={'status ' + cls}>
      <span className="dot"></span>
      {status}
    </span>
  )
}
