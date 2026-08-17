import { Field, TextInput } from './fields.jsx'

export default function StepAbout({ data, setField, errors }) {
  return (
    <>
      <Field label="Name" required htmlFor="dc-name" field="name" error={errors.name}>
        <TextInput id="dc-name" value={data.name} onChange={(v) => setField('name', v)} autoComplete="name" placeholder="Your name" />
      </Field>

      <Field label="Email" required htmlFor="dc-email" field="email" error={errors.email}>
        <TextInput id="dc-email" type="email" value={data.email} onChange={(v) => setField('email', v)} autoComplete="email" placeholder="you@example.com" />
      </Field>

      <Field label="Business / Brand name" htmlFor="dc-business" field="business" helper="If you don’t have one yet, that’s completely fine.">
        <TextInput id="dc-business" value={data.business} onChange={(v) => setField('business', v)} placeholder="Your business or brand" />
      </Field>

      <Field label="Where are you based?" htmlFor="dc-location" field="location">
        <TextInput id="dc-location" value={data.location} onChange={(v) => setField('location', v)} placeholder="Valencia, Spain" />
      </Field>

      <Field label="Website or social media" htmlFor="dc-website" field="website" helper="Website, Instagram, LinkedIn or anywhere we can learn more about your work.">
        <TextInput id="dc-website" value={data.website} onChange={(v) => setField('website', v)} placeholder="https://…" />
      </Field>
    </>
  )
}
