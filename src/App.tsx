// react
import { useLayoutEffect, useEffect, useState } from "react"
// types
import { textType } from "./Types"
// layout components
import Loader from "./components/Loader"
import Header from "./components/Header"
import Footer from "./components/Footer"
// components
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Works from "./components/sections/Works"
import CTA from "./components/sections/CTA"

const App = () => {
  const [text, setText] = useState<textType>()

  // get localization
  let lang: string | null
  if(localStorage.getItem('lang')) lang = localStorage.getItem('lang')
  else if(navigator.language == "de") lang = "de"
  else if(navigator.language == "ja") lang = "ja"
  else if(navigator.language == "ru") lang = "ru"
  else lang = "en-US"
  // get text
  useLayoutEffect(()=>{
    fetch('/api/' + lang + '.json')
      .then(res => { return res.json() })
      .then(data => setText(data))
  }, [lang])

  useEffect(()=>{
    if(document.readyState === "complete") onLoad()
    else{
      window.addEventListener("load", onLoad)
      return () => window.removeEventListener("load", onLoad)
    }
  }, [])

  // observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.remove('toAnimate')
    })
  })

  const onLoad = () => {
    const loader: HTMLElement | null = document.querySelector('.loader')
    const path: SVGPathElement | null | undefined = loader?.querySelector('path')
    const content: HTMLElement | null = document.querySelector('.content')
    // complete loader circle
    path!.style.animation = "none"
    setTimeout(()=>{ path!.style.strokeDasharray = "100, 100" })
    setTimeout(()=>{
      // hide loader
      loader!.style.opacity = "0"
      loader!.style.pointerEvents = "none"
      document.body.style.overflow = "unset"
      content!.style.opacity = "1"
      // elements to observe
      setTimeout(()=>{document.querySelectorAll('.toAnimate').forEach(item => observer.observe(item))}, 700)
    }, 750)
  }

  return (
    <>
      <Loader/>
      <div className="content">
        <Header header={text && text.header} />
        <main>
          <Hero hero={text && text.hero} />
          <About about={text && text.about} />
          <Works works={text && text.works} />
          <CTA cta={text && text.cta} />
        </main>
        <Footer footer={ text && text.footer } />
      </div>
    </>
  )
}

export default App