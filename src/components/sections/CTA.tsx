// types
import { ctaType } from "../../Types"

const CTA = ({ cta }: { cta: ctaType | undefined }) => {
  return (
    <section className="cta wrapper">
    <div className="img" style={{ backgroundImage: "url('/assets/images/neighbors.svg')" }}/>
      <h1>{ cta && cta.title }</h1>
      <a href="mailto:ghbdtnghbdtn8@gmail.com" className="btn contact">{ cta && cta.contact }</a>
    </section>
  )
}
 
export default CTA