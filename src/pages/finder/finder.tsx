
import "./finder.css";

import { IoLanguage } from "react-icons/io5";
import { LuLayers3, LuWrench, LuFile, LuBriefcase} from "react-icons/lu";
import { LuDumbbell } from "react-icons/lu";
import { PiGraduationCapBold , PiCodeBold} from "react-icons/pi";
import { MdMovie, MdOutlineVideogameAsset, MdChevronRight } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";

import FrenchLogo from "../../assets/france.png";
import EnglishLogo from "../../assets/union-jack.png";
import SepteoLogo from "../../assets/septeoLogo.svg";

import { WindowContext } from "../../context/windowContext";
import React, { useContext } from "react";



type FinderItem = {
  name: string;
  description: string;
  duration?: string;
  icon?: string;
  logo?: string | React.ReactNode;
  window?: boolean;
}

type FinderSection = {
  name: string;
  content: {
    columnName: string[];
    items: FinderItem[];
  };
  sideBarLogo: React.ReactNode;
}

const FinderContent: FinderSection[] = [
  {
    name: "Parcours scolaire",
    content: {
      columnName: ["Diplômes et établissements", "Années"],
      items: [
        { name: "Epitech Bachelor", description: "2025/aujourd'hui", logo: <LuFile size={16} />, window: true },
        { name: "Lycée polyvalent Simone de Beauvoir", description: "2020/2025", logo: <LuFile size={16} />, window: true },
      ]
    },
    sideBarLogo: <PiGraduationCapBold size={25} color="007AFF"/>
  },
  {
    name: "Expérience",
    content: {
      columnName: ["Entreprise", "Poste", "Durée"],
      items: [
        { name: "Septeo", description: "Stagiaire", duration: "Deux mois", logo: SepteoLogo, window: true },
      ]
    },
    sideBarLogo: <LuBriefcase size={25} color="007AFF"/>
  },
  {
    name: "Langages de programmation",
    content: {
      columnName: ["Langages de programmation", "Niveaux de maîtrise"],
      items: [
        { name: "JavaScript", description: "Intermédiaire", icon: "devicon-javascript-plain colored" },
        { name: "TypeScript", description: "Intermédiaire", icon: "devicon-typescript-plain colored" },
        { name: "Kotlin", description: "Intermédiaire", icon: "devicon-kotlin-plain colored" },
        { name: "Python", description: "Avancé", icon: "devicon-python-plain colored" },
        { name: "HTML", description: "Avancé", icon: "devicon-html5-plain colored" },
        { name: "CSS", description: "Avancé", icon: "devicon-css3-plain colored" },
        { name: "Bash", description: "Intermédiaire", icon: "devicon-bash-plain colored" },
        { name: "Rust", description: "Notions de base", icon: "devicon-rust-plain colored" },
        { name: "SQL", description: "Intermédiaire", icon: "devicon-mysql-plain colored" },
        { name: "MongoDB", description: "Notions de base", icon: "devicon-mongodb-plain colored" },
        { name: "Java", description: "Intermédiaire", icon: "devicon-java-plain colored" },
        { name: "DynamoDB", description: "Intermédiaire", icon: "devicon-dynamodb-plain colored" },
      ]
    },
    sideBarLogo: <PiCodeBold size={25} color="007AFF"/>
  },
  {
    name: "Frameworks & Librairies",
    content: {
      columnName: ["Framework et Librairies", "Ecosystème"],
      items: [
        { name: "React", description: "Frontend (Avancé)", icon: "devicon-react-original colored" },
        { name: "Node.js", description: "Backend (Intermédiaire)", icon: "devicon-nodejs-plain colored" },
        { name: "Prisma", description: "Backend (Intermédiaire)", icon: "devicon-prisma-plain colored" },
        { name: "Express", description: "API (Intermédiaire)", icon: "devicon-express-original colored" },
        { name: "Tailwind CSS", description: "UI (Notions de base)", icon: "devicon-tailwindcss-plain colored" },
      ]
    },
    sideBarLogo: <LuLayers3 size={25} color="007AFF"/>
  },
  {
    name: "Outils",
    content: {
      columnName: ["Outils et technologies", "Niveaux de maîtrise"],
      items: [
        { name: "Git", description: "Intermédiaire", icon: "devicon-git-plain" },
        { name: "GitHub", description: "Intermédiaire", icon: "devicon-github-original colored" },
        { name: "Docker", description: "Intermédiaire", icon: "devicon-docker-plain colored" },
        { name: "Linux", description: "Intermédiaire", icon: "devicon-linux-plain colored" },
        { name: "Visual Studio Code", description: "Avancé", icon: "devicon-vscode-plain colored" },
        { name: "Postman", description: "Intermédiaire", icon: "devicon-postman-plain colored" },
        { name: "Figma", description: "Intermédiaire", icon: "devicon-figma-plain colored" },
        { name: "AWS", description: "Intermédiaire", icon: "devicon-amazonwebservices-plain-wordmark colored" },
      ]
    },
    sideBarLogo: <LuWrench size={25} color="007AFF"/>
  },
  {
    name: "Langues",
    content: {
      columnName: ["Langues", "Niveaux de maîtrise"],
      items: [
        { name: "Français", description: "Courant", logo: FrenchLogo },
        { name: "Anglais", description: "Intermédiaire", logo: EnglishLogo },
      ]
    },
    sideBarLogo: <IoLanguage size={25} color="007AFF"/>
  },
  {
    name: "Loisirs",
    content: {
      columnName: ["Loisirs", "Description"],
      items: [
        { name: "Sport", description: "Course à pied, Musculation", logo: <LuDumbbell size={16} /> },
        { name: "Cinéma", description: "Science-Fiction, Thriller, Biopic Historique (ex: Premier Contact, Dune, Oppenheimer ,Tenet)", logo: <MdMovie size={16} /> },
        { name: "Jeux Vidéo", description: "Valorant, Elden-Ring, Hollow-Knight, Le Man Ultimate", logo: <MdOutlineVideogameAsset size={16} /> },
        { name: "Sport automobile", description: "GT World Challenge Europe", logo: <FaFlagCheckered size={16} /> },
      ]
    },
    sideBarLogo: <LuFile size={25} color="007AFF"/>
  },
];

function FinderSideBar() {
  const { windows, setWindowPage } = useContext(WindowContext)!;
  const openPage = windows.find((w) => w.title === "Finder")?.currentPage || FinderContent[0].name

  return (
    <>
      <div className="finderSideBar">
        <div className="finderSideBarFavoriteTitle">Favoris</div>
        <div className="finderSideBarFavoriteItem">
          {FinderContent.map((info) => (
            <div className={`finderSideBarItem ${openPage === info.name ? "active" : ""}`} key={info.name} onClick={() => {setWindowPage("Finder", info.name)}}>
              <div className="finderSideBarIcon">{info.sideBarLogo}</div>          
              <div className={`finderSideBarText ${openPage === info.name ? "active" : ""}`}>{info.name}</div>
            </div>    
          ))}
        </div>
      </div>    
    </>
  )
}

function Finder() {
  const { windows, openWindow } = useContext(WindowContext)!;
  
  const openPage = windows.find((w) => w.title === "Finder")?.currentPage || FinderContent[0].name;
  const pageContent = FinderContent.find((info) => info.name === openPage) || FinderContent[0];
  const numCols = pageContent.content.columnName.length;

  return (
    <>
      <div className="finderContainer">
        <div className="finderHeader finderGrid" style={{ "--cols": numCols } as React.CSSProperties}>
          {pageContent.content.columnName.map((column, index) => (
            <div key={index} className="finderHeaderColumn">{column}</div>
          ))}
        </div>
        <div className="finderBody">
          {pageContent.content.items.map((item, index) => (
            <div 
              key={index} 
              className={`finderItem finderGrid ${item.window ? "clickable" : ""}`} 
              style={{ "--cols": numCols } as React.CSSProperties } 
              onClick={() => {if (item.window) { openWindow(item.name) }}}
            >
              <div className="finderItemName">
                {item.icon && (
                  <div className="finderItemIcon">
                    <i className={`${item.icon}`}></i>
                  </div>
                )}
                {item.logo &&(
                  typeof item.logo === "string"
                  ? <img className="finderItemIcon" src={item.logo} alt={item.name} />
                  : <div className="finderItemIcon">{item.logo}</div>
                )}
                {item.name}
              </div>
              <div className="finderItemDescription">{item.description}</div>
              {item.duration && (
                <div className="finderItemDuration">{item.duration}</div>
              )}
              {item.window && <MdChevronRight className="finderItemChevron" size={20} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Finder, FinderSideBar };
