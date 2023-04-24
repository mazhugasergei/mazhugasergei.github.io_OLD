// react
import { useEffect, useRef } from "react"
// types
import { footerType } from "../Types"
// icons
import { BsGlobe } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"
import { FaLinkedin, FaGithub, FaYoutube, FaDev } from "react-icons/fa"

const Footer = ({ footer }: { footer: footerType | undefined }) => {
  const languagesButton = useRef<HTMLLabelElement>(null)
  const languagesButtonCheckbox = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    // set onckick event for language select menu
    document.addEventListener("click", (e) => {
      if(!languagesButton.current?.contains(e.target as Node | null) && !languagesButtonCheckbox.current?.contains(e.target as Node | null)) languagesButtonCheckbox.current!.checked = false
      else{
        const langBtns = document.querySelectorAll<HTMLLIElement>('footer .languages-item')
        if(langBtns) langBtns.forEach(item => item.tabIndex = 0)
      }
    })
    // close language select menu on scroll
    document.addEventListener("scroll", (e) => {
      languagesButtonCheckbox.current!.checked = false
    })
    // close language select menu on touchstart
    document.addEventListener("touchstart", (e) => {
      const list: HTMLDataListElement | null = document.querySelector('footer .languages-list')
      if(list) if(!languagesButton.current?.contains(e.target as Node | null) && !languagesButtonCheckbox.current?.contains(e.target as Node | null) && !list.contains(e.target as Node | null)) languagesButtonCheckbox.current!.checked = false
    })
    // add onclick event for language change button
    document.querySelectorAll('footer .languages-item').forEach(lang => {
      lang.addEventListener("click", (e)=>{
        const li: HTMLElement | null = e.target as HTMLElement
        const lang: string = li?.dataset.lang as string
        localStorage.setItem('lang', lang)
        window.location.replace('/')
      })
    })
  }, [])

  return (
    <footer className="wrapper">
      <div className="container wrapper">

        <div className="languages-container">
          <input ref={languagesButtonCheckbox} className="languages-button-checkbox" type="checkbox" id="languages"/>
          <label ref={languagesButton} className="languages-button" htmlFor="languages">
            <BsGlobe />
            <span>{ footer && footer.language }</span>
            <MdKeyboardArrowDown />
          </label>
          <ul className="languages-list">
            <li className="languages-item" data-lang="en-US">
              <div>English</div>
              <div>English (US)</div>
            </li>
            <li className="languages-item" data-lang="de">
              <div>Deutsch</div>
              <div>German</div>
            </li>
            <li className="languages-item" data-lang="ja">
              <div>日本語</div>
              <div>Japanese</div>
            </li>
            <li className="languages-item" data-lang="ko">
              <div>한국어</div>
              <div>Korean</div>
            </li>
            <li className="languages-item" data-lang="ru">
              <div>Русский</div>
              <div>Russian</div>
            </li>
          </ul>
        </div>

        <div className="social">
          <a target="_blank" href="https://www.linkedin.com/in/sergei-mazhuga-274618247/"><FaLinkedin/></a>
          <a target="_blank" href="https://github.com/mazhugasergei"><FaGithub/></a>
          <a target="_blank" href="https://www.youtube.com/channel/UC07C6734bBfcNVL2Za8Y_-A"><FaYoutube/></a>
          <a target="_blank" href="https://dev.to/markuswedler"><FaDev/></a>
        </div>

      </div>
    </footer>
  )
}
 
export default Footer