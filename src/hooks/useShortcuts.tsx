import { useContext, useEffect, useMemo } from "react";
import { WindowContext } from "../context/windowContext";
import { FiCommand } from "react-icons/fi";

export type Shortcut = {
  name: string;
  keys: string[];
  displayKeys: (string | React.ReactNode)[];
  action: () => void;
};

export const useShortcuts = () => {
  const { closeWindow, closeAllWindows, toggleMaximize, getActiveWindows, openWindow, toggleSidebar } = useContext(WindowContext)!;

  const shortcuts: Shortcut[] = useMemo(() => [
    {
      name: "Fermer la fenêtre active",
      keys: ["q"],
      displayKeys: [<FiCommand/>, "Q"],
      action: () => {
        const active = getActiveWindows();
        if (active) closeWindow(active.title);
      },
    },
    {
      name: "Fermer toutes les fenêtres",
      keys: ["m"],
      displayKeys: [<FiCommand/>, "M"],
      action: () => closeAllWindows(),
    },
    {
      name: "Maximiser la fenêtre active",
      keys: ["f"],
      displayKeys: [<FiCommand/>, "F"],
      action: () => {
        const active = getActiveWindows();
        if (active) toggleMaximize(active.title);
      },
    },
    {
      name: "Afficher/Masquer la barre latérale",
      keys: ["b"],
      displayKeys: [<FiCommand/>, "B"],
      action: () => {
        const active = getActiveWindows();
        if (active && active.sideBar !== undefined) toggleSidebar(active.title);
      },
    },
    {
      name: "Ouvrir le Finder",
      keys: ["i"],
      displayKeys: [<FiCommand/>, "I"],
      action: () => openWindow("Finder"),
    },
  ], [closeWindow, closeAllWindows, toggleMaximize, getActiveWindows, openWindow, toggleSidebar]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.altKey)) return;

      const shortcut = shortcuts.find((s) => s.keys.includes(event.key));
      
      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  return { shortcuts };
};
