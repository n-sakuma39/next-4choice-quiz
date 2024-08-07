import React from "react";

interface ChoicesProps {
  choices: string[];
  selected: number | null;
  nextDisabled: boolean;
  answered: number[];
  choose: (index: number) => void;
}

const Choices: React.FC<ChoicesProps> = ({
  choices,
  selected,
  nextDisabled,
  answered,
  choose,
}) => {
  return (
    <div id="qa-choices" className="">
      <ul>
        {choices.map((choice, index) => (
          <li
            key={index}
            className={`flex justify-between border border-slate-400 p-3 mb-3 cursor-pointer ${
              nextDisabled || answered.includes(index)
                ? "cursor-not-allowed"
                : ""
            } ${selected === index ? "bg-blue-100" : ""}`}
            onClick={() => choose(index)}
          >
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Choices;
