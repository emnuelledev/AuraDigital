import ManagerListSection from './ManagerListSection.jsx'
import { notes } from '../../data/notes.js'

const itemFields = [
  { key: 'cat', label: 'Category', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
]

export default function ManagerNotes() {
  return (
    <ManagerListSection
      section="notes"
      fallback={notes}
      title="Labs — Lab Notes"
      description="Short research fragments shown in the Labs notes strip."
      itemFields={itemFields}
      emptyItem={{ cat: '', title: '', excerpt: '' }}
      itemLabel={(item) => item.title || 'New note'}
      getItems={(data) => data}
      setItems={(_data, items) => items}
    />
  )
}
