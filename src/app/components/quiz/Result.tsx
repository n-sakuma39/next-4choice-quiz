import React from "react";
import Button from "@/app/components/elements/Button";

interface ResultProps {
  correctCount: number;
  dataLength: number;
  details: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
  retry: () => void;
}

const Result: React.FC<ResultProps> = ({
  correctCount,
  dataLength,
  details,
  retry,
}) => {
  const scorePercentage = Math.floor((correctCount / dataLength) * 1000) / 10;

  return (
    <div id="result-box">
      <p className="text-center font-bold text-2xl mb-8">実施結果</p>
      <ul className="">
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex justify-start items-center">
            <dt className="w-[60px] font-bold md:mb-0 md:mr-4">合否</dt>
            <dd className="w-full">
              {correctCount === dataLength ? (
                <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  合格
                </span>
              ) : (
                <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  不合格
                </span>
              )}
              <span className="text-sm block mt-2">
                （合格ライン：スコア100%以上）
              </span>
            </dd>
          </dl>
        </li>
        <li className="border-b border-gray-300 pb-3 mb-3">
          <dl className="flex flex-col md:flex-row md:items-center">
            <dt className="w-[60px] font-bold mb-2 md:mb-0 md:mr-4">スコア</dt>
            <dd className="w-full">
              <div>
                <span className="font-bold text-red-500">
                  {scorePercentage}%
                </span>{" "}
                / 100%
              </div>
              <div>
                <div className="progressbar bg-gray-300 h-3 w-full">
                  <div
                    className="bg-orange-500 h-3"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
              </div>
            </dd>
          </dl>
        </li>
        <li className="mt-8">
          <dl className="flex flex-col md:flex-row md:items-center">
            <dt className="w-full font-bold mb-5 md:mr-4">【各設問の詳細】</dt>
            <dd></dd>
          </dl>
        </li>
      </ul>
      <div className="mb-7">
        {details.map((detail, index) => (
          <div key={index} className="answer-card mb-10">
            <div className="mb-4 font-bold">
              Q.{index + 1}:
              {detail.isCorrect ? (
                <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                  正解
                </span>
              ) : (
                <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                  不正解
                </span>
              )}
            </div>
            <ul className="flex flex-col text-sm">
              <li className="bottom-1 border-black">
                <dl className="flex flex-col md:flex-row w-full border border-gray-300">
                  <dt className="bg-gray-100 font-bold p-3 border-r border-gray-300 w-full md:w-1/6 flex-shrink-0">
                    設問
                  </dt>
                  <dd className="p-3 border-t border-gray-300 flex-grow">
                    {detail.question}
                  </dd>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="flex flex-col md:flex-row w-full border border-gray-300">
                  <dt className="bg-gray-100 font-bold p-3 border-r border-gray-300 w-full md:w-1/6 flex-shrink-0">
                    あなたの回答
                  </dt>
                  <dd className="p-3 border-t border-gray-300 flex-grow">
                    {detail.userAnswer}
                  </dd>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="flex flex-col md:flex-row w-full border border-gray-300">
                  <dt className="bg-gray-100 font-bold p-3 border-r border-gray-300 w-full md:w-1/6 flex-shrink-0">
                    正答
                  </dt>
                  <dd className="p-3 border-t border-gray-300 flex-grow">
                    {detail.correctAnswer}
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-col">
        <Button
          onClick={retry}
          className="bg-orange-400 hover:bg-orange-300 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
        >
          もう一度挑戦する
        </Button>
      </div>
    </div>
  );
};

export default Result;
