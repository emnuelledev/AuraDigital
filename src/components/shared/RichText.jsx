// Renders trusted, static rich copy (from src/data/site.js) that contains
// inline markup like <em>, <strong>, <span class="grad"> or entities.
export default function RichText({ as: Tag = 'p', html, className, ...rest }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}
