import { Field, TextArea, PillSingle } from './fields.jsx'
import { timelineOptions, budgetOptions } from '../../data/discovery.js'

export default function StepDetails({ data, setField, errors }) {
  return (
    <>
      <Field label="When would you ideally like to start?" required field="timeline" error={errors.timeline}>
        <PillSingle name="Timeline" options={timelineOptions} value={data.timeline} onChange={(v) => setField('timeline', v)} />
      </Field>

      <Field
        label="Do you have a budget range in mind for this project?"
        helper="This simply helps us understand what kind of solution makes sense for you. We can always discuss the details together."
      >
        <PillSingle name="Budget range" options={budgetOptions} value={data.budget} onChange={(v) => setField('budget', v)} />
      </Field>

      <Field
        label="Is there anything else you’d like us to know?"
        htmlFor="dc-notes"
        helper="Ideas, references, challenges, questions — anything you think might help us understand the project."
      >
        <TextArea id="dc-notes" value={data.notes} onChange={(v) => setField('notes', v)} placeholder="Optional" />
      </Field>
    </>
  )
}
