import "./noteLoader.css";

import TisseoTrackerPreviewImage1 from "../../assets/tisseoTrackerPreviewImage1.png";
import TisseoTrackerPreviewImage2 from "../../assets/tisseoTrackerPreviewImage2.png";
import TisseoTrackerPreviewImage3 from "../../assets/tisseoTrackerPreviewImage3.png";

import eTodoPreviewImage from "../../assets/etodoPreviewImage.png";

import PortfolioPreviewImage from "../../assets/portfolioPreviewImage.png";

function TisseoTracker(){
  return (
    <div className="tisseoTrackerContainer">
      <img className="tisseoTrackerPreviewImage" src={TisseoTrackerPreviewImage1} alt={`TisseoTracker preview`}/>
      <img className="tisseoTrackerPreviewImage" src={TisseoTrackerPreviewImage2} alt={`TisseoTracker preview`}/>
      <img className="tisseoTrackerPreviewImage" src={TisseoTrackerPreviewImage3} alt={`TisseoTracker preview`}/>          
    </div>
  );
}

function ETodo(){
    return (
        <div className="defaultContainer"> 
            <img className="defaultPreviewImage" src={eTodoPreviewImage} alt={`eTodo preview`}/>        
        </div>
    );
}

function Portfolio(){
    return (
        <div className="defaultContainer">
            <img className="defaultPreviewImage" src={PortfolioPreviewImage} alt={`Portfolio preview`}/>
        </div>
    );
}

export { TisseoTracker, ETodo, Portfolio };