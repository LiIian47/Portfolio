import "./profile.css"
import ProfilePicture from "../../assets/profilePicture.jpg"

function Profile() {
  return (
    <div className="profileContent">
      <img className="profilePicture" src={ProfilePicture} alt="Profile" />
      <p className="profileBio">
        Une curiosité sans limite, une soif d'apprendre constante, et le code pour donner vie à mes idées. Bienvenue sur mon portfolio&nbsp;!
      </p>
    </div>
  );
}

export default Profile;