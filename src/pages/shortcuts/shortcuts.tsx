import "./shortcuts.css";
import { useShortcuts } from "../../hooks/useShortcuts";
import { FiCommand } from "react-icons/fi";

const isMac = /mac/i.test(navigator.platform);

function Shortcuts() {
  const { shortcuts } = useShortcuts();

  return (
    <div className="shortcutsContainer">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.name} className="shortcutItem">
          <div className="shortcutName">{shortcut.name}</div>
          <div className="shortcutKeys">
            {shortcut.displayKeys.map((item, index) => {
              const isModifier = index === 0 && typeof item !== "string";
              return (
                <div key={index} className="keyContainer">
                  {isModifier ? (
                    isMac ? (
                      <div className="keyIcon"><FiCommand /></div>
                    ) : (
                      <div className="keyText">Alt</div>
                    )
                  ) : typeof item !== "string" ? (
                    <div className="keyIcon">{item}</div>
                  ) : (
                    <div className="keyText">{item}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shortcuts;
