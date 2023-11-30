// QuizComponent.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface QuizData {
  ID: number;
  category: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

const QuizComponent = () => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isNextButtonVisible, setNextButtonVisible] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/quizData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // ランダムにシャッフルし、最大10件取得
        const shuffledData = data
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((question: any, index: number) => {
            const choices = [
              question.choices1?.toString() || "",
              question.choices2?.toString() || "",
              question.choices3?.toString() || "",
              question.choices4?.toString() || "",
            ];
            return { ...question, choices, ID: index + 1 }; // 連番のIDを設定
          });

        setQuizData(shuffledData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 最後の質問の場合、最初から次へボタンを非表示にする
    setIsLastQuestion(currentQuestionIndex === quizData.length - 1);
  }, [currentQuestionIndex, quizData]);

  useEffect(() => {
    // 各設問が始まるときに次へボタンを非表示にする
    setNextButtonVisible(false);
  }, [currentQuestionIndex, quizData]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
    setNextButtonDisabled(true);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleChoiceClick = (choiceIndex: number) => {
    // すでに回答済みの場合は処理しない
    if (answeredQuestions.includes(currentQuestionIndex)) {
      return;
    }

    const selectedChoice = quizData[currentQuestionIndex].choices[choiceIndex];
    const correctAnswer = quizData[currentQuestionIndex].answer;

    // 回答が正解かどうかを判定
    const isCorrect = selectedChoice === correctAnswer;

    // 選択した回答と正解が一致しているかをセット
    setIsAnswerCorrect(isCorrect);

    // 選択した回答をセット
    setSelectedAnswer(choiceIndex);

    // 次へボタンを有効にする
    setNextButtonDisabled(false);

    // 最後の質問に回答していない場合は次へボタンを表示
    if (currentQuestionIndex < quizData.length - 1) {
      setNextButtonVisible(true);
    }

    // 最後の質問に回答した場合、次へボタンではなく結果を見るボタンを表示
    if (currentQuestionIndex === quizData.length - 1) {
      setNextButtonVisible(false); // 次へボタンを非表示に
      setIsQuizFinished(true); // クイズ終了フラグを立てる
    } else {
      // 最後の質問以外の場合は次へボタンを表示
      setNextButtonVisible(true);
    }
  };

  const handleNextButtonClick = () => {
    // ここに次へボタンがクリックされたときの処理を追加
    // 例えば、何かしらの操作やログを記述するなど
  };

  const progressBarStyle = {
    width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`,
    height: "10px",
    backgroundColor: "#4caf50",
    transition: "width 0.5s",
  };

  return (
    <div id="qa-box" className="border border-slate-300 rounded-2xl py-8 px-14">
      {currentQuestionIndex < quizData.length && (
        <div className="qa-inner">
          <p>設問数：{`${currentQuestionIndex + 1}/${quizData.length}`}</p>
          <div className="progress-bar mb-8" style={progressBarStyle}></div>
          <div id="qa-title" className="mb-6 font-bold">
            {`Q.${currentQuestionIndex + 1}：${
              quizData[currentQuestionIndex].question
            }`}
          </div>
          <div id="qa-choices" className="">
            <ul>
              {quizData[currentQuestionIndex].choices.map((choice, index) => (
                <li
                  key={index}
                  className={`flex justify-between border border-slate-400 p-3 mb-3 cursor-pointer ${
                    isNextButtonDisabled ||
                    answeredQuestions.includes(currentQuestionIndex)
                      ? "cursor-not-allowed"
                      : ""
                  } ${selectedAnswer === index ? "bg-blue-100" : ""}`}
                  onClick={() => handleChoiceClick(index)}
                >
                  {choice}
                </li>
              ))}
            </ul>
          </div>
          {isNextButtonVisible && !isQuizFinished && (
            <div id="qa-next-button" className="flex justify-end mt-8">
              <button
                className="next inline-block px-4 py-2 bg-blue-500 text-white rounded hover-bg-blue-600"
                onClick={handleNextQuestion}
                disabled={isNextButtonDisabled}
              >
                次へ
              </button>
            </div>
          )}
          {isQuizFinished && (
            <div id="qa-next-button" className="flex justify-center mt-12">
              <Link
                href="/result"
                className="next block w-1/2 text-center p-4 bg-orange-500 text-white rounded hover:bg-orange-400"
              >
                結果を見る
              </Link>
            </div>
          )}
        </div>
      )}
      {/* ▼ここから結果画面▼ */}
      <div id="result-box">
        <p className="text-center font-bold text-2xl mb-10">実施結果</p>

        <ul className="mb-5">
          <li className="border-b border-gray-300 pb-3 mb-3">
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">合否</dt>
              <dd>
                <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  合格
                </span>
                or
                <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                  不合格
                </span>
                <span className="text-sm block mt-2">
                  合格ライン：スコア100%以上
                </span>
              </dd>
            </dl>
          </li>
          <li className="border-b border-gray-300 pb-3 mb-3">
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">スコア</dt>
              <dd>
                <div>
                  <span className="font-bold text-red-500">100%</span> / 100%
                </div>
                <div>
                  <div className="progressbar bg-gray-300 h-3 w-full">
                    <div className="bg-orange-500 h-3"></div>
                  </div>
                </div>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="flex flex-col md:flex-row md:items-center">
              <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">
                各設問の詳細
              </dt>
              <dd></dd>
            </dl>
          </li>
        </ul>

        <div className="mb-20">
          <div className="answer-card mb-10">
            <div className="mb-4 font-bold">
              Q.1:
              <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                合格
              </span>
              or
              <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block ml-2">
                不合格
              </span>
            </div>
            <ul className="flex flex-col text-sm">
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    設問
                  </dt>
                  <dd className="table-cell p-4">
                    JavaScriptのPromiseオブジェクトは何を行うために使用されるでしょう？
                  </dd>
                  <dt></dt>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    あなたの回答
                  </dt>
                  <dd className="table-cell p-4">
                    あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答あなたの回答
                  </dd>
                  <dt></dt>
                </dl>
              </li>
              <li className="bottom-1 border-black">
                <dl className="table w-full border border-gray-300">
                  <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                    正答
                  </dt>
                  <dd className="table-cell p-4">
                    正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答正答
                  </dd>
                  <dt></dt>
                </dl>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center flex-col">
          <Link
            href="/quiz"
            className="bg-orange-400 hover:bg-orange-300 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
          >
            もう一度挑戦する
          </Link>
        </div>
      </div>
      {/* ▲ここまで結果画面 */}
    </div>
  );
};

export default QuizComponent;
