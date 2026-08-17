import { Field, TextArea, TextInput, PillSingle, PillMulti } from './fields.jsx'
import { serviceOptions, materialsOptions } from '../../data/discovery.js'

export default function StepProject({ data, setField, errors }) {
  return (
    <>
      <Field label="What would you like Aura Digital to help you with?" required field="services" error={errors.services}>
        <PillMulti name="Services" options={serviceOptions} value={data.services} onChange={(v) => setField('services', v)} exclusive="I’m not sure yet" />
        {data.services.includes('Other') && (
          <div className="dc-subfield">
            <TextInput id="dc-services-other" value={data.servicesOther} onChange={(v) => setField('servicesOther', v)} placeholder="Please specify" aria-label="Please specify what else you need" />
          </div>
        )}
      </Field>

      <Field
        label="What are you hoping to achieve with this project?"
        required
        htmlFor="dc-goal"
        field="goal"
        error={errors.goal}
        helper="Tell us about the result you’re looking for, the problem you’re trying to solve, or simply the idea you have in mind."
      >
        <TextArea id="dc-goal" value={data.goal} onChange={(v) => setField('goal', v)} placeholder="What would a great outcome look like?" />
      </Field>

      <Field label="Do you already have branding, content or materials we should work with?">
        <PillSingle name="Existing materials" options={materialsOptions} value={data.materials} onChange={(v) => setField('materials', v)} />
      </Field>
    </>
  )
}
