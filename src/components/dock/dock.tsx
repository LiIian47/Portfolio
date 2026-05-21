import "./dock.css";

import { useContext, useEffect, useRef, useState } from "react";
import { WindowContext } from "../../context/windowContext";
import type { WindowDescriptor } from "../../context/windowContext";

const DockIcon = ({ item, isOpen, openWindow }: { item: WindowDescriptor; isOpen: boolean; openWindow: (title: string) => void }) => (
  <div
    className="dockIcon"
    key={item.title}
    onClick={() => item.url ? window.open(item.url, "_blank") : openWindow(item.title)}
  >
    <img className="dockIconImage" src={item.logo} alt={item.title} />
    <div className="dockIconName">{item.displayTitle ? item.displayTitle : item.title}</div>
    <div className={isOpen ? "dockIconSelect" : ""} />
  </div>
);

function Dock() {
  const { windows, openWindow } = useContext(WindowContext)!;
  const [isVisible, setIsVisible] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  const isAnyMaximized = windows.some(
    (w) => w.state === "open" && w.isMaximized,
  );

  const openApps = windows
    .filter((w) => w.state === "open" || w.state === "minimise")
    .map((w) => w.title);

  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isAnyMaximized) return
      
      const dock = dockRef.current;
      if (!dock) return;
      const dockRect = dock.getBoundingClientRect();

      const nearBottom = window.innerHeight - e.clientY < 5;
      const withinDockX = e.clientX >= dockRect.left && e.clientX <= dockRect.right;

      if (nearBottom && withinDockX) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isAnyMaximized]);

  const displayDock = !isAnyMaximized || isVisible;

  const pinnedIcons = windows.filter((w) => w.pinned);
  const unpinnedIcons = windows.filter((w) => !w.pinned && (w.state === "open" || w.state === "minimise"));
  return (
    <div className={`dockContainer ${displayDock ? "show" : ""}`} ref={dockRef} onMouseLeave={() => setIsVisible(false)}>
      <div className="dockPinnedIcon">
        {pinnedIcons.map((item) => (
          <DockIcon key={item.title} item={item} isOpen={openApps.includes(item.title)} openWindow={openWindow} />
        ))}
      </div>
      <div className="dockUnpinnedIcons">
        {unpinnedIcons.length > 0 && <div className="dockSpliter"></div>        }
        {unpinnedIcons.map((item) => (
          <DockIcon key={item.title} item={item} isOpen={openApps.includes(item.title)} openWindow={openWindow} />
        ))}
      </div>
    </div>
  );
}

export default Dock;
