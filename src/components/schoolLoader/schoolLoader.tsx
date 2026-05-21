import "./schoolLoader.css"

import EpitechImage from "../../assets/epitechImage.png";
import LyceeImage from "../../assets/lyceeImage.png";

interface SchoolLoaderContent {
  title: string;
  image: string;
  content: string;
}

const schoolLoaderContent: SchoolLoaderContent[] = [
  {
    title: "Epitech Bachelor",
    image: EpitechImage,
    content: "J'ai rejoint le Bachelor d'Epitech en 2025 pour plonger concrètement dans le monde du développement. Ce qui me plaît dans ce cursus, c'est l'approche par projets : on n'apprend pas seulement à coder, on apprend à gérer des deadlines, à travailler en équipe et à trouver des solutions par nous-mêmes.\n\nDès la deuxième année, ce cursus permet de s'orienter vers des domaines de pointe selon nos affinités techniques. J'aurai ainsi l'opportunité de me spécialiser parmi plusieurs filières stratégiques :\n\n- Intelligence Artificielle : Pour concevoir des algorithmes prédictifs et des modèles d'apprentissage.\n- Cybersécurité : Pour apprendre à protéger les infrastructures et anticiper les menaces.\n- Développement Full Stack : Pour maîtriser l'ensemble de la chaîne de création d'une application, du front-end au back-end.\n- Cloud & Web3 : Pour explorer les architectures décentralisées et les services cloud scalables.\n- Tech Business : Pour allier expertise technique et vision stratégique en entreprise.\n\nL'objectif, d'ici l'obtention de mon diplôme en 2028, est de transformer chaque défi technique en une expérience concrète et de bâtir une expertise solide dans l'une de ces spécialités pour répondre aux enjeux de demain.",
  },
  {
    title: "Lycée polyvalent Simone de Beauvoir",
    image: LyceeImage,
    content: "Avant d'intégrer Epitech, j'ai suivi un cursus scientifique qui m'a donné le goût de la technique. J'ai choisi les spécialités Mathématiques, Sciences de l'Ingénieur et Physique-Chimie, ce qui m'a permis de comprendre les bases de la conception et de la logique système. C'est vraiment durant mes cours de SI (Sciences de l'Ingénieur) que j'ai confirmé mon envie de passer de la théorie à la création concrète."
  }
];

type SchoolLoaderProps = {
  title: string;
};

function SchoolLoader( { title }: SchoolLoaderProps ) {
  return (
    <>
      {schoolLoaderContent.filter((school) => school.title === title).map((school) => (
        <div key={title} className="schoolLoaderContainer">
          <img className="schoolLoaderImage"src={school.image} alt={school.title} />
          <div className="schoolLoaderTextContainer">
            <div className="schoolLoaderTitle">{school.title}</div>
            <div className="schoolLoaderContent">{school.content}</div>
          </div>
        </div>
        ))
      }
    </>
  );
}

export default SchoolLoader;