import "./desktop.css";
import { useContext } from "react";
import { WindowContext } from "../../context/windowContext";
import MenuBar from "../../components/menuBar/menuBar";
import Dock from "../../components/dock/dock";
import Window from "../../components/window/window";
import { useShortcuts } from "../../hooks/useShortcuts";


function Desktop() {
  const { windows } = useContext(WindowContext)!;
  
  useShortcuts();

  return (
    <>
      <MenuBar/>
      <div className="desktopContainer">
        {windows
          .filter((window) => window.state === "open" )
          .map((window) => (
            <Window
              key={window.title}
              title={window.title}
            />
          ))}
      </div>
      <Dock/>
    </>
  );
}

export default Desktop;
