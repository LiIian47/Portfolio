import "./finderWindowLoader.css"

import EpitechImage from "../../assets/epitechImage.png";
import LyceeImage from "../../assets/lyceeImage.png";
import SepteoImage from "../../assets/septeoImage.jpg";

interface FinderWindowContent {
  title: string;
  image?: string;
  content: string;
}

const finderWindowContent: FinderWindowContent[] = [
  {
    title: "Epitech Bachelor",
    image: EpitechImage,
    content: "J'ai rejoint le Bachelor d'Epitech en 2025 pour plonger concrètement dans le monde du développement. Ce qui me plaît dans ce cursus, c'est l'approche par projets : on n'apprend pas seulement à coder, on apprend à gérer des deadlines, à travailler en équipe et à trouver des solutions par nous-mêmes.\n\nDès la deuxième année, ce cursus permet de s'orienter vers des domaines de pointe selon nos affinités techniques. J'aurai ainsi l'opportunité de me spécialiser parmi plusieurs filières stratégiques :\n\n- Intelligence Artificielle : Pour concevoir des algorithmes prédictifs et des modèles d'apprentissage.\n- Cybersécurité : Pour apprendre à protéger les infrastructures et anticiper les menaces.\n- Développement Full Stack : Pour maîtriser l'ensemble de la chaîne de création d'une application, du front-end au back-end.\n- Cloud & Web3 : Pour explorer les architectures décentralisées et les services cloud scalables.\n- Tech Business : Pour allier expertise technique et vision stratégique en entreprise.\n\nL'objectif, d'ici l'obtention de mon diplôme en 2028, est de transformer chaque défi technique en une expérience concrète et de bâtir une expertise solide dans l'une de ces spécialités pour répondre aux enjeux de demain.",
  },
  {
    title: "Lycée polyvalent Simone de Beauvoir",
    image: LyceeImage,
    content: "Avant d'intégrer Epitech, j'ai suivi un cursus scientifique qui m'a donné le goût de la technique. J'ai choisi les spécialités Mathématiques, Sciences de l'Ingénieur et Physique-Chimie, ce qui m'a permis de comprendre les bases de la conception et de la logique système. C'est vraiment durant mes cours de SI (Sciences de l'Ingénieur) que j'ai confirmé mon envie de passer de la théorie à la création concrète."
  },
  {
    title: "Septeo",
    image: SepteoImage,
    content: "J'ai réalisé mon stage de développeur Full Stack chez Septeo Proptech, dans leurs locaux de Toulouse, du 26 mai au 28 juillet 2026. J'ai intégré l'équipe de développement web du pôle Immobilier, où j'ai travaillé sur deux projets : une application d'état des lieux et une application de visite d'immeubles.\n\nMissions réalisées :\n\n- Application d'état des lieux (EDL) : audit du code, correction de bugs et développement de nouvelles fonctionnalités, dont l'import d'anciens états des lieux (PDF ou photos) via un modèle de vision pour repartir de l'existant.\n- Application de visite d'immeubles : conception from scratch, en autonomie et sans cahier des charges, d'une application permettant la collecte d'informations et le suivi technique lors des visites de grands ensembles immobiliers (React, Node.js, Express, Docker).\n- Communication EDL / SPI : résolution d'un bug entre l'EDL et le logiciel de gestion SPI, en interceptant le trafic réseau avec Fiddler puis en m'accordant avec l'équipe SPI sur les correctifs à apporter.\n\nCe que ce stage m'a appris :\n\n- Dette technique : EDL avait été lancé par un seul développeur avant d'être intégré au Hub web de Septeo. Pour tenir les délais, des fonctionnalités communes ont dû être recodées directement dans l'application, ce qui m'a montré concrètement d'où vient une base de code difficile à maintenir.\n- Besoin client : comprendre le métier de l'immobilier (état des lieux, visites, vocabulaire des agents) grâce à des démonstrations et aux équipes métier a été aussi important que la technique.\n\nJe pensais trouver un cadre très formel, un code irréprochable et des tâches limitées pour un étudiant de première année. J'ai découvert l'inverse : de vraies responsabilités, un code parfois imparfait, et surtout un projet informatique qui dépend avant tout des personnes qui le portent et de la manière dont l'équipe s'organise. Passer d'un code qui tourne en local à un code qui tourne en production a énormément enrichi mon savoir-faire, et m'a appris qu'un bon développeur doit aussi savoir s'intégrer dans une équipe et communiquer.",
  }
];

type FinderWindowLoaderProps = {
  title: string;
};

function FinderWindowLoader( { title }: FinderWindowLoaderProps ) {
  return (
    <>
      {finderWindowContent.filter((item) => item.title === title).map((item) => (
        <div key={title} className="finderWindowLoaderContainer">
          {item.image && <img className="finderWindowLoaderImage" src={item.image} alt={item.title} />}
          <div className="finderWindowLoaderTextContainer">
            <div className="finderWindowLoaderTitle">{item.title}</div>
            <div className="finderWindowLoaderText">{item.content}</div>
          </div>
        </div>
        ))
      }
    </>
  );
}

export default FinderWindowLoader;