import React, { useState, useEffect } from "react";
import Button from "@/app/components/elements/Button";
import ProgressBar from "./ProgressBar";
import Question from "./Question";
import Choices from "./Choices";
import Result from "./Result";

interface Quiz {
  ID: number;
  category: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

interface Props {
  initialData: Quiz[];
}

const QuizComp: React.FC<Props> = ({ initialData }) => {
  const [data, setData] = useState<Quiz[]>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [nextVisible, setNextVisible] = useState(false);
  const [answered, setAnswered] = useState<number[]>([]);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [lastQ, setLastQ] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [details, setDetails] = useState<
    {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLastQ(qIndex === data.length - 1);
  }, [qIndex, data]);

  useEffect(() => {
    setNextVisible(false);
  }, [qIndex, data]);

  const nextQ = () => {
    if (qIndex < data.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
    setNextDisabled(true);
    setCorrect(null);
  };

  const choose = (index: number) => {
    const choice = data[qIndex].choices[index];
    const answer = data[qIndex].answer;

    const isCorrect = choice === answer;

    setCorrect(isCorrect);
    setSelected(index);
    setNextDisabled(false);

    if (qIndex < data.length - 1) {
      setNextVisible(true);
    }

    if (qIndex === data.length - 1) {
      setNextVisible(false);
    } else {
      setNextVisible(true);
    }

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }

    setDetails([
      ...details,
      {
        question: data[qIndex].question,
        userAnswer: choice,
        correctAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const prevQ = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
      const prevDetails = details[qIndex - 1];

      if (prevDetails) {
        const prevSelected = data[qIndex - 1].choices.indexOf(
          prevDetails.userAnswer
        );
        setSelected(prevSelected);
      }

      const updatedDetails = [...details];
      updatedDetails.pop();
      setDetails(updatedDetails);

      const lastCorrect =
        updatedDetails.length > 0
          ? updatedDetails[updatedDetails.length - 1].isCorrect
          : false;
      if (lastCorrect) {
        setCorrectCount(correctCount - 1);
      }
    }
  };

  const viewResult = () => {
    setFinished(true);
  };

  const retry = () => {
    localStorage.removeItem("quizData");
    window.location.reload();
  };

  const progressPercentage = ((qIndex + 1) / data.length) * 100;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="qa-box" className="p-5 border border-slate-300 rounded-2xl">
      {qIndex < data.length && (
        <div className="qa-inner">
          {!finished && (
            <div className="progressLength">
              <p>進捗：{`${qIndex + 1}/${data.length}`}</p>
              <ProgressBar progress={progressPercentage} />
            </div>
          )}

          {!finished && (
            <Question
              question={`Q.${qIndex + 1}：${data[qIndex]?.question || ""}`}
            />
          )}
          {!finished && (
            <Choices
              choices={data[qIndex]?.choices}
              selected={selected}
              nextDisabled={nextDisabled}
              answered={answered}
              choose={choose}
            />
          )}
          <div className="flex justify-between mt-4">
            {qIndex > 0 && !finished ? (
              <Button
                className="prev inline-block px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base sm:px-4 sm:py-2"
                onClick={prevQ}
              >
                &lt; 前の設問に戻る
              </Button>
            ) : (
              <div></div>
            )}
            {nextVisible && !finished ? (
              <div id="qa-next-button">
                <Button
                  className="next inline-block px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base sm:px-4 sm:py-2"
                  onClick={nextQ}
                  disabled={nextDisabled}
                >
                  次の質問に進む &gt;
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {lastQ && selected !== null && !finished && (
            <div id="qa-next-button" className="flex justify-center mt-8 mb-4">
              <Button
                onClick={viewResult}
                className="next bg-orange-400 hover:bg-orange-300 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
              >
                結果を見る
              </Button>
            </div>
          )}
          {finished && (
            <Result
              correctCount={correctCount}
              dataLength={data.length}
              details={details}
              retry={retry}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizComp;
