import { Field, TextArea, TextInput, PillSingle } from './fields.jsx'
import { stageOptions } from '../../data/discovery.js'

export default function StepBusiness({ data, setField, errors }) {
  return (
    <>
      <Field label="What does your business, brand or project do?" required htmlFor="dc-description" field="description" error={errors.description}>
        <TextArea id="dc-description" value={data.description} onChange={(v) => setField('description', v)} placeholder="Tell us what you do…" />
      </Field>

      <Field label="What stage are you currently at?" required field="stage" error={errors.stage}>
        <PillSingle name="Current stage" options={stageOptions} value={data.stage} onChange={(v) => setField('stage', v)} />
        {data.stage === 'Other' && (
          <div className="dc-subfield">
            <TextInput id="dc-stage-other" value={data.stageOther} onChange={(v) => setField('stageOther', v)} placeholder="Please specify" aria-label="Please specify your stage" />
          </div>
        )}
      </Field>

      <Field label="Who are your customers or who would you like to reach?" htmlFor="dc-audience" field="audience">
        <TextArea id="dc-audience" value={data.audience} onChange={(v) => setField('audience', v)} placeholder="Optional" />
      </Field>
    </>
  )
}
