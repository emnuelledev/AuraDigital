import ManagerListSection from './ManagerListSection.jsx'
import { experiments } from '../../data/experiments.js'

const itemFields = [
  { key: 'id', label: 'ID (e.g. 001)', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'year', label: 'Year', type: 'text' },
  { key: 'disciplines', label: 'Disciplines', type: 'list' },
  { key: 'status', label: 'Status (Prototype / Ongoing / Exploring)', type: 'text' },
  { key: 'freq', label: 'Frequency (card color)', type: 'select', options: ['iris', 'cyan', 'violet', 'rose', 'soft'] },
  { key: 'desc', label: 'Description', type: 'textarea' },
  { key: 'cta', label: 'Link label', type: 'text' },
  { key: 'link', label: 'Link URL (# for none yet)', type: 'text' },
  { key: 'placeholder', label: 'Placeholder card (dashed, no link)', type: 'checkbox' },
]

export default function ManagerExperiments() {
  return (
    <ManagerListSection
      section="experiments"
      fallback={experiments}
      title="Labs — Experiments"
      description="Shown in the Labs archive grid, in this order."
      itemFields={itemFields}
      emptyItem={{ id: '', title: '', year: '', disciplines: [], status: 'Exploring', freq: 'soft', cta: '', link: '#', desc: '', placeholder: false }}
      itemLabel={(item) => item.title || 'New experiment'}
      getItems={(data) => data}
      setItems={(_data, items) => items}
    />
  )
}
