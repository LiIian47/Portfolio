import SettingLogo from "../assets/settingApp.svg"
import GithubLogo from "../assets/githubApp.svg";
import NoteLogo from "../assets/noteApp.svg";
import ResumeLogo from "../assets/previewApp.svg";
import MailLogo from "../assets/mailApp.svg";
import LinkedinLogo from "../assets/linkedinApp.svg";
import FinderLogo from "../assets/finderApp.svg";
import EpitechLogo from "../assets/epitechApp.svg";
import LyceeLogo from "../assets/lyceeApp.svg";
import SepteoLogo from "../assets/septeoApp.svg";

import React, { createContext, useEffect, useState } from "react"

export type WindowDescriptor = {
  title: string
  displayTitle?: string
  sideBar?: boolean
  logo?: string
  url?: string
  currentPage?: string
  state?: "open" | "close" | "minimise"
  isMaximized?: boolean
  resizable?: boolean
  pinned: boolean
  default?: {
    width?: number
    height?: number
    x?: number
    y?: number
  }
  current?: {
    width: number
    height: number
    x: number
    y: number
  }
}

type WindowContextType = {
  windows: WindowDescriptor[]
  windowOrder: string[]
  openWindow: (title: string) => void
  closeWindow: (title: string) => void
  minimiseWindow: (title: string) => void
  bringToFront: (title: string) => void
  toggleMaximize: (title: string) => void
  toggleSidebar: (title: string) => void
  updateWindowMetrics: (title: string, metrics: { width: number; height: number; x: number; y: number }) => void
  closeAllWindows: () => void
  setWindowPage: (title: string, page: string) => void
  getActiveWindows: () => WindowDescriptor | undefined
}

const WindowContext = createContext<WindowContextType | null>(null)

const initialWindows: WindowDescriptor[] = [
  { title: "Profile", displayTitle: "Profil", logo: SettingLogo, state: "close", pinned: true, default: { width: 350, height: 450 }, resizable: false },
  { title: "Finder", displayTitle: "À propos", sideBar: true, logo: FinderLogo, state: "open", pinned: true, default: { width: 930, height: 550 }},
  { title: "Resume", displayTitle: "CV", logo: ResumeLogo, state: "close", pinned: true, default: { width: 820, height: 800 }},
  { title: "Note", displayTitle: "Projet", sideBar: true, logo: NoteLogo, state: "close", pinned: true, default: { width: 1000 }},
  { title: "Github", logo: GithubLogo, url: "https://github.com/LiIian47", pinned: true },
  { title: "Mail", displayTitle: "Contact", logo: MailLogo, state: "close", pinned: true, default: { width: 480, height: 550 }},
  { title: "Linkedin", logo: LinkedinLogo, url: "https://www.linkedin.com/in/lilian-davezac", pinned: true },
  { title: "Epitech Bachelor", logo: EpitechLogo, state: "close", pinned: false, default: { width: 625, height: 775 }},
  { title: "Lycée polyvalent Simone de Beauvoir", logo: LyceeLogo, state: "close", pinned: false, default: { width: 790, height: 600 }},
  { title: "Septeo", logo: SepteoLogo, state: "close", pinned: false, default: { width: 500, height: 600 }},
  { title: "Shortcuts", displayTitle: "Raccourcis", logo: SettingLogo, state: "close", pinned: false, default: { width: 320, height: 500 }, resizable: false },
]



export function WindowProvider({ children }: { children: React.ReactNode }) {

  const [windows, setWindows] = useState<WindowDescriptor[]>(() => {
    const saved = localStorage.getItem("windowStates")
    return saved ? JSON.parse(saved) : initialWindows
  })

  const [windowOrder, setWindowOrder] = useState<string[]>(() => {
    const saved = localStorage.getItem("windowOrder")
    return saved ? JSON.parse(saved) : initialWindows.map(w => w.title)
  })

  useEffect(() => {
    localStorage.setItem("windowStates", JSON.stringify(windows))
  }, [windows])

  useEffect(() => {
    localStorage.setItem("windowOrder", JSON.stringify(windowOrder))
  }, [windowOrder])

  const bringToFront = (title: string) => {
    setWindowOrder(prev => {
      const filtered = prev.filter(t => t !== title)
      return [...filtered, title]
    })
  }

  const openWindow = (title: string) => {
    setWindows(prev => prev.map(w => w.title === title ? { ...w, state: "open" } : w))
    bringToFront(title)
  }

  const closeWindow = (title: string) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, state: "close" } : w))

  const minimiseWindow = (title: string) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, state: "minimise" } : w))

  const toggleMaximize = (title: string) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, isMaximized: !w.isMaximized } : w))

  const toggleSidebar = (title: string) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, sideBar: !w.sideBar } : w))

  const updateWindowMetrics = (title: string, metrics: { width: number; height: number; x: number; y: number }) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, current: { ...metrics } } : w))

  const closeAllWindows = () =>
    setWindows(prev => prev.map(w => ({ ...w, state: "close" })))

  const setWindowPage = (title: string, page: string) =>
    setWindows(prev => prev.map(w => w.title === title ? { ...w, currentPage: page } : w))

  const getActiveWindows = () => {
    const openWindows = windows.filter(w => w.state === 'open');
    if (openWindows.length > 0) {
      // Find the open window that is highest in the windowOrder
      for (let i = windowOrder.length - 1; i >= 0; i--) {
        const title = windowOrder[i];
        const win = openWindows.find(w => w.title === title);
        if (win) return win;
      }
    }
  }

  return (
    <WindowContext.Provider value={{ windows, windowOrder, openWindow, closeWindow, minimiseWindow, bringToFront, toggleMaximize, toggleSidebar,updateWindowMetrics, closeAllWindows, getActiveWindows, setWindowPage }}>
      {children}
    </WindowContext.Provider>
  )
}

export { WindowContext }
