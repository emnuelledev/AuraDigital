import ManagerListSection from './ManagerListSection.jsx'
import { faq } from '../../data/site.js'

const itemFields = [
  { key: 'q', label: 'Question', type: 'text' },
  { key: 'a', label: 'Answer', type: 'textarea' },
]

export default function ManagerFaq() {
  return (
    <ManagerListSection
      section="faq"
      fallback={faq}
      title="FAQ"
      description="Shown in the “Good to know” section, in this order."
      itemFields={itemFields}
      emptyItem={{ q: '', a: '' }}
      itemLabel={(item) => item.q || 'New question'}
      getItems={(data) => data.items}
      setItems={(data, items) => ({ ...data, items })}
    />
  )
}
