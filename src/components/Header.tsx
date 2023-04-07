// react
import { useEffect } from "react"
// types
import { headerType } from "../Types"

const Header = ({ header }: { header: headerType | undefined }) => {
  const changeHeader = () => {
    // change border-bottom bg
    const wrapper: HTMLElement | null = document.querySelector('header .wrapper')
    window.scrollY > 0 ? wrapper?.classList.add("scrolled") : wrapper?.classList.remove("scrolled")
  }

  useEffect(()=>{
    // change header on render if needed
    changeHeader()
    // add scroll event listener
    window.addEventListener("scroll", changeHeader)
    // close menu on outside or link click
    document.addEventListener("click", (e)=>{
      const label: HTMLLabelElement | null = document.querySelector('header .menu-button')
      const input: HTMLInputElement | null = document.querySelector('header .menu-button-checkbox')
      if(label && input){
        if(!label.contains(e.target as Node | null) && !input.contains(e.target as Node | null)) input.checked = false
      }
    })
    // close menu on scroll
    window.addEventListener("scroll", ()=>{
      const input: HTMLInputElement | null = document.querySelector('header .menu-button-checkbox')
      if(input) input.checked = false
    })
    // close menu on touchstart
    document.addEventListener("touchstart", (e)=>{
      const label: HTMLLabelElement | null = document.querySelector('header .menu-button')
      const input: HTMLInputElement | null = document.querySelector('header .menu-button-checkbox')
      const nav: HTMLElement | null = document.querySelector('header .menu')
      if(label && input && nav){
        if(!label.contains(e.target as Node | null) && !input.contains(e.target as Node | null) && !nav.contains(e.target as Node | null)) input.checked = false
      }
    })
  }, [])

  return (
    <header className="wrapper">
      <div className="container wrapper">
        <a href="/" className="logo">Sergei</a>
        <input className="menu-button-checkbox" type="checkbox" id="menuBtn"/>
        <ul className="menu">
          <li className="menu-item">
            <a href="#">{ header && header.home }</a>
          </li>
          <li className="menu-item">
            <a href="#about">{ header && header.about }</a>
          </li>
          <li className="menu-item">
            <a href="#works">{ header && header.works }</a>
          </li>
        </ul>
        <label className="menu-button" htmlFor="menuBtn"/>
      </div>
    </header>
  )
}
 
export default Header