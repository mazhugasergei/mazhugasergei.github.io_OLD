// types
import { ctaType } from "../../Types"

const CTA = ({ cta }: { cta: ctaType | undefined }) => {
  return (
    <section className="cta wrapper">
      <h1>{ cta && cta.title }</h1>
      <a href="mailto:ghbdtnghbdtn8@gmail.com" className="btn contact">{ cta && cta.contact }</a>
    </section>
  )
}
 
export default CTA