import "./menuBar.css";
import Wifi from "../../assets/wifiLogo.svg";
import Search from "../../assets/searchLogo.svg";
import Apple from "../../assets/appleLogo.svg"
import ClipBoardLogo from "../../assets/clipboardLogo.svg";
import formatMenuBarDate from "../../utils/formatMenuBarDate";
import { useEffect, useState, useRef, useContext } from "react";
import { WindowContext } from "../../context/windowContext";
import { ThemeContext } from "../../context/themeContext";

type MenuItem = {
  label: string;
  action: () => void;
  logo?: string;
}

type MenuCategory = {
  category: string;
  items: MenuItem[];
}

const renderMenuCategory = (category: string) => {
  switch (category) {
    case "Apple":
      return <img src={Apple} className="apple" alt="Apple Icon"/>;
    case "Lilian Davezac":
      return <div className="profile">Lilian Davezac</div>;
    default:
      return category;
  }
};

function MenuBar() {
  const { openWindow, closeAllWindows } = useContext(WindowContext)!;
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)!;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);;

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("lilian.davezac@gmail.com");
    alert("Email copied to clipboard");
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText("+33 7 62 06 63 29");
    alert("Phone number copied to clipboard");
  };


  const menus : MenuCategory[] = [
    {
      category: "Apple",
      items: [
        { label: isDarkMode ? "Mode clair" : "Mode sombre", action: toggleDarkMode },
      ],
    },
    {
      category: "Lilian Davezac",
      items: [
        { label: "Profil", action: () => openWindow("Profile") },
      ],
    },
    {
      category: "Fichier",
      items: [
        { label: "Finder", action: () => openWindow("Finder") },
        { label: "Projet", action: () => openWindow("Projet") },
        { label: "Github", action: () => window.open("https://github.com/LiIian47", "_blank") },
        { label: "Cv", action: () => openWindow("Cv") },
        { label: "Contact", action: () => openWindow("Contact") },
        { label: "Linkedin", action: () => window.open("https://www.linkedin.com/in/lilian-davezac-392990397", "_blank") },
      ],
    },
    {
      category: "Editer",
      items: [
        { label: "Copier Email", action: copyEmailToClipboard, logo: ClipBoardLogo},
        { label: "Copier Téléphone", action: copyPhoneToClipboard, logo: ClipBoardLogo },
      ],
    },
    // {
    //   category: "Affichage",
    //   items: [
    //     { label: "Réinitialiser le tutoriel", action: noop }
    //   ],
    // },
    {
      category: "Fenêtre",
      items: [
        { label: "Fermer les fenêtres", action: closeAllWindows },
      ],
    },
    {
      category: "Aide",
      items: [
        { label: "Raccourcis", action: () => openWindow("Shortcuts") },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };  
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="menuBar">
      <div className="menuBarLeft" ref={menuRef}>
        {menus.map((menu) => (
          <div key={menu.category} className="menuItemContainer">
            <div className={`menuCategory ${openMenu === menu.category ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === menu.category ? null : menu.category)}>
              {renderMenuCategory(menu.category)}
            </div>
            <div className={`overlay ${openMenu === menu.category ? "show" : ""}`}>
              {menu.items.map((item) => (
                <button key={item.label} onClick={() => {item.action(); setOpenMenu(null)}}>
                  {item.label}
                  {item.logo && <img className="overlayLogo" src={item.logo} alt={`${item.label} logo`} />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="menuBarRight">
        <img src={Wifi} className="menuIcon" alt="Wifi Icon" />
        <img src={Search} className="menuIcon" alt="Search Icon" />
        <svg
          className="menuIcon"
          viewBox="0 0 29 29"
          width="16"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden
        >
          <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z" />
        </svg>
        <div className="timeDisplay">{formatMenuBarDate(new Date())}</div>
      </div>
    </div>
  );
}

export default MenuBar;
