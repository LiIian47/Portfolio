import { WindowContext } from "../../context/windowContext";
import { useContext } from "react";
import "./trafficLight.css";

import CloseLogo from "../../assets/closeLogo.svg";
import MinimizeLogo from "../../assets/minimizeLogo.svg";
import MaximizeLogo from "../../assets/maximizeLogo.svg";

type TrafficLightProps = {
  title: string;
}

function TrafficLight({ title }: TrafficLightProps) {
  const { windows, closeWindow, minimiseWindow, toggleMaximize } = useContext(WindowContext)!;
  const currentWindow = windows.find(w => w.title === title);
  const isMaximized = currentWindow?.isMaximized || false;
  const isResizable = currentWindow?.resizable !== false;

  return (
    <div className="trafficLightContainer">
      <button className="trafficLight1 " onClick={() => closeWindow(title)}>
        <img src={CloseLogo} alt="close" className="trafficLightLogo"/>    
      </button>
      <button className={`trafficLight2 ${isMaximized ? 'maximized' : ''}`} onClick={() => isMaximized ? null : minimiseWindow(title)}>
        <img src={MinimizeLogo} alt="minimize" className="trafficLightLogo"/>
      </button>
      <button 
        className={`trafficLight3 ${!isResizable ? 'disabled' : ''}`} 
        onClick={() => isResizable && toggleMaximize(title)}
        disabled={!isResizable}
      >
        <img src={MaximizeLogo} alt="maximize" className="trafficLightLogo"/>
      </button>
    </div>
  );
}

export default TrafficLight;