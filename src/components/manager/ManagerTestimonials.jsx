import ManagerListSection from './ManagerListSection.jsx'
import { testimonials } from '../../data/site.js'

const itemFields = [
  {
    key: 'avatar', label: 'Photo', type: 'image', folder: 'avatars',
    helper: 'Square photo works best, at least 300×300px — it displays in a small circle, cropped to the center of the image, so keep the face or focal point in the middle. Larger or non-square photos still work, just double-check the crop after saving.',
  },
  { key: 'quote', label: 'Quote', type: 'textarea' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role / business', type: 'text' },
  { key: 'wide', label: 'Feature this one (spans both columns)', type: 'checkbox' },
]

export default function ManagerTestimonials() {
  return (
    <ManagerListSection
      section="testimonials"
      fallback={testimonials}
      title="Testimonials"
      description="Shown in the “In their words” section. The featured quote spans both columns — keep at most one checked."
      itemFields={itemFields}
      emptyItem={{ avatar: '', quote: '', name: '', role: '', wide: false }}
      itemLabel={(item) => item.name || 'New testimonial'}
      getItems={(data) => data.items}
      setItems={(data, items) => ({ ...data, items })}
    />
  )
}
