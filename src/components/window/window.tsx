import "./window.css";
import { useState, useEffect, useContext } from "react";
import { Rnd } from "react-rnd";
import { WindowContext } from "../../context/windowContext";
import TrafficLight from "../trafficLight/trafficLight";

import Shortcuts from "../../pages/shortcuts/shortcuts";
import Resume from "../../pages/resume/resume";
import Mail from "../../pages/mail/mail";
import FinderWindowLoader from "../finderWindowLoader/finderWindowLoader";
import { Note, NoteSideBar } from "../../pages/note/note";
import { Finder, FinderSideBar } from "../../pages/finder/finder";
import Profile from "../../pages/profile/profile";

import { TbLayoutSidebar } from "react-icons/tb";

type WindowProps = {
  title: string;
};

function Window({ title}: WindowProps) {
  const { windows, windowOrder, bringToFront, toggleSidebar, updateWindowMetrics } = useContext(WindowContext)!;
  const [isDragging, setIsDragging] = useState(false);

  const currentWindow = windows.find(w => w.title === title);
  const isMaximized = currentWindow?.isMaximized || false;
  const zIndex = windowOrder.indexOf(title);
  const sidebar = ["Finder", "Note"].includes(title);

  const initialWidth = Math.min(currentWindow?.default?.width || window.innerWidth - 40, window.innerWidth - 40); // choisi entre la largeur par défaut et la largeur maximale (fenêtre moins une marge)
  const initialHeight = Math.min(currentWindow?.default?.height || window.innerHeight - 80, window.innerHeight - 150);
  const initialX = currentWindow?.default?.x ?? 20;
  const initialY = currentWindow?.default?.y ?? 48;
  
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  
  useEffect(() => {
    if (isMaximized) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight - 28);
      setX(0);
      setY(28);
    } else {
      setWidth(currentWindow?.current?.width || initialWidth);
      setHeight(currentWindow?.current?.height || initialHeight);
      setX(currentWindow?.current?.x || initialX);
      setY(currentWindow?.current?.y || initialY);
    }
  }, [isMaximized]);

  const renderSidebar = () => {
    switch (title) {
      case "Finder":
        return <FinderSideBar />;
      case "Note":
        return <NoteSideBar />;
      default:
        return <div>{title}</div>;
    }
  };

  const renderMainContent = () => {
    switch (title) {
      case "Profile":
        return <Profile />;
      case "Shortcuts":
        return <Shortcuts />;
      case "Resume":
        return <Resume isDragging={isDragging} />;
      case "Mail":
        return <Mail />;
      case "Epitech Bachelor":
        return <FinderWindowLoader title="Epitech Bachelor" />;
      case "Lycée polyvalent Simone de Beauvoir":
        return <FinderWindowLoader title="Lycée polyvalent Simone de Beauvoir" />;
      case "Septeo":
        return <FinderWindowLoader title="Septeo" />;
      case "Finder":
        return <Finder />;
      case "Note":
        return <Note />;
      default:
        return <div>{title}</div>;
    }
  };

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      style={{ zIndex }}
      dragHandleClassName="windowHeader"
      enableResizing={(currentWindow?.resizable !== false) && !isMaximized}
      disableDragging={isMaximized}
      minWidth={300}
      minHeight={240}
      onDrag={(_e, d) => {
        if (isMaximized) return;
        setX(d.x);
        setY(d.y < 28 ? 28 : d.y);
      }}
      onDragStop={(_e, d) => {
        if (isMaximized) return;
        const controlledY = d.y < 28 ? 28 : d.y;
        setX(d.x);
        setY(controlledY);
        setIsDragging(false);
        updateWindowMetrics(title, { width, height, x: d.x, y: controlledY });
      }}
      onDragStart={() => {
        if (isMaximized) return;
        setIsDragging(true);
        bringToFront(title);
      }}
      onMouseDown={() => {
        bringToFront(title);
      }}
      onResizeStart={() => {
        bringToFront(title);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        if (isMaximized) return;
        const newWidth = parseInt(ref.style.width, 10);
        const newHeight = parseInt(ref.style.height, 10);
        setWidth(newWidth);
        setHeight(newHeight);
        setX(position.x);
        setY(position.y);
        updateWindowMetrics(title, {
          width: newWidth,
          height: newHeight,
          x: position.x,
          y: position.y,
        });
      }}
    >
      <div className={`window ${isDragging ? 'isDragging' : ''} ${isMaximized ? 'isMaximized' : ''}`}>
        <div className="windowControls">
          <TrafficLight title={title}/>
          {sidebar && (
            <button className="windowSideBarToggle" onClick={() => toggleSidebar(title)}>
              <TbLayoutSidebar size={18}/>
            </button>
          )}
        </div>
        
        {sidebar ? (
          <div className="windowBody">
            {currentWindow?.sideBar && (
              <div className="windowSideBar">
                {renderSidebar()}
              </div>
            )}
            <div className="windowRight">
              <div className="windowHeader">
                <div className="windowTitle">{currentWindow?.displayTitle ? currentWindow.displayTitle : title}</div>
              </div>
              <div className="windowContent">
                {renderMainContent()}
              </div>
            </div>
          </div>
        ) : (
          <div className="windowRight">
            <div className="windowHeader">
              <div className="windowTitle">{currentWindow?.displayTitle ? currentWindow.displayTitle : title}</div>
            </div>
            <div className="windowContent">
              {renderMainContent()}
            </div>
          </div>
        )}
      </div>
    </Rnd>
  );
}

export default Window;
