import "./resume.css";

function Resume({ isDragging }: { isDragging: boolean }) {
  return (
    <>
      <div className="resumeContainer">
        <iframe 
          title="Resume" 
          src="/resume.pdf" 
          style={{ pointerEvents: isDragging ? "none" : "auto" }}
        ></iframe>
        <div className="iframeMouseFix"></div>
      </div>
    </>
  );
}

export default Resume;