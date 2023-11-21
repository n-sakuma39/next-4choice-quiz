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
    </div>
  );
};

export default QuizComponent;
