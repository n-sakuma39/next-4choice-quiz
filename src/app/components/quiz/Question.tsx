import React from "react";

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div id="qa-title" className="mb-6 font-bold">
      {question}
    </div>
  );
};

export default Question;
