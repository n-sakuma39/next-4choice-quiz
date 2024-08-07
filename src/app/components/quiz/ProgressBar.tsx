import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressStyle = {
    width: `${progress}%`,
    height: "10px",
    backgroundColor: "#4caf50",
    transition: "width 0.5s",
  };

  return <div className="progress-bar mb-8" style={progressStyle}></div>;
};

export default ProgressBar;
