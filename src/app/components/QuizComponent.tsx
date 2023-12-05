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
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // New state variable
  const [answeredQuestionsDetails, setAnsweredQuestionsDetails] = useState<
    {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }[]
  >([]); // New state variable
  const [progress, setProgress] = useState(0); // New state variable for progress bar
  const [progressCount, setProgressCount] = useState(0); // New state variable for progress count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/quizData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // ランダムにシャッフルし、最大件数を取得する
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
      setSelectedAnswer(null); // Reset the selection when moving to the next question
    } else {
      setIsQuizFinished(true);
    }
    setNextButtonDisabled(true);
    setIsAnswerCorrect(null);
  };

  const handleChoiceClick = (choiceIndex: number) => {
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
    } else {
      // 最後の質問以外の場合は次へボタンを表示
      setNextButtonVisible(true);
    }

    // If the answer is correct, increment the count of correct answers
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    // Check if the question has already been answered
    const answeredQuestionIndex = answeredQuestions.findIndex(
      (answeredQuestion) => answeredQuestion === currentQuestionIndex
    );

    // If the question has not been answered yet, update the progress bar and progressCount
    if (answeredQuestionIndex === -1) {
      setProgress(progress + 1);
      setProgressCount(progressCount + 1);
      // Add the current question to the list of answered questions
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }

    // If the question has already been answered, update the answer
    if (answeredQuestionIndex !== -1) {
      const updatedAnsweredQuestionsDetails = [...answeredQuestionsDetails];
      updatedAnsweredQuestionsDetails[answeredQuestionIndex] = {
        question: quizData[currentQuestionIndex].question,
        userAnswer: selectedChoice,
        correctAnswer,
        isCorrect,
      };
      setAnsweredQuestionsDetails(updatedAnsweredQuestionsDetails);
    } else {
      // If the question has not been answered yet, add the answer
      setAnsweredQuestionsDetails([
        ...answeredQuestionsDetails,
        {
          question: quizData[currentQuestionIndex].question,
          userAnswer: selectedChoice,
          correctAnswer,
          isCorrect,
        },
      ]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Restore the previous selection
      const previousQuestionDetails = answeredQuestionsDetails[currentQuestionIndex - 1];
      const previousSelectedAnswer = quizData[currentQuestionIndex - 1].choices.indexOf(previousQuestionDetails.userAnswer);
      setSelectedAnswer(previousSelectedAnswer);

      // Update the answeredQuestionsDetails and correctAnswersCount
      const updatedAnsweredQuestionsDetails = [...answeredQuestionsDetails];
      updatedAnsweredQuestionsDetails.pop();
      setAnsweredQuestionsDetails(updatedAnsweredQuestionsDetails);

      const lastAnswerIsCorrect = updatedAnsweredQuestionsDetails.length > 0 ? updatedAnsweredQuestionsDetails[updatedAnsweredQuestionsDetails.length - 1].isCorrect : false;
      if (lastAnswerIsCorrect) {
        setCorrectAnswersCount(correctAnswersCount - 1);
      }
    }
  };

  const handleViewResultClick = () => {
    setIsQuizFinished(true);
  };

  const progressBarStyle = {
    width: `${(progress / quizData.length) * 100}%`,
    height: "10px",
    backgroundColor: "#4caf50",
    transition: "width 0.5s",
  };

  // スコア計算
  const scorePercentage =
    Math.floor((correctAnswersCount / quizData.length) * 1000) / 10;

  return (
    <div
      id="qa-box"
      className="py-4 px-7 sm:py-8 sm:px-14 sm:mx-4 border border-slate-300 rounded-2xl"
    >
      {currentQuestionIndex < quizData.length && (
        <div className="qa-inner">
          {!isQuizFinished && (
            <div className="progressLength">
              <p>進捗：{`${progressCount}/${quizData.length}`}</p>
              <div className="progress-bar mb-8" style={progressBarStyle}></div>
            </div>
          )}

          {!isQuizFinished && (
            <div id="qa-title" className="mb-6 font-bold">
              {`Q.${currentQuestionIndex + 1}：${
                quizData[currentQuestionIndex].question
              }`}
            </div>
          )}
          {!isQuizFinished && (
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
          )}
          <div className="flex justify-between mt-8">
            {currentQuestionIndex > 0 && !isQuizFinished ? (
              <button
                className="prev inline-block px-4 py-2 bg-blue-500 text-white rounded hover-bg-blue-600"
                onClick={handlePreviousQuestion}
              >
                &lt; 前の設問に戻る
              </button>
            ) : (
              <div></div> // 空のdivを追加
            )}
            {isNextButtonVisible && !isQuizFinished ? (
              <div id="qa-next-button">
                <button
                  className="next inline-block px-4 py-2 bg-blue-500 text-white rounded hover-bg-blue-600"
                  onClick={handleNextQuestion}
                  disabled={isNextButtonDisabled}
                >
                  次の質問に進む &gt;
                </button>
              </div>
            ) : (
              <div></div> // 空のdivを追加
            )}
          </div>
          {isLastQuestion && selectedAnswer !== null && !isQuizFinished && (
            <div id="qa-next-button" className="flex justify-center mt-12">
              <button
                onClick={handleViewResultClick}
                className="next block w-1/2 text-center p-4 bg-orange-500 text-white rounded hover:bg-orange-400"
              >
                結果を見る
              </button>
            </div>
          )}
          {isQuizFinished && (
            <div id="result-box">
              <p className="text-center font-bold text-2xl mb-10">実施結果</p>

              <ul className="mb-5">
                <li className="border-b border-gray-300 pb-3 mb-3">
                  <dl className="flex flex-col md:flex-row md:items-center">
                    <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">
                      合否
                    </dt>
                    <dd className="w-full">
                      {correctAnswersCount === quizData.length ? (
                        <span className="bg-green-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                          合格
                        </span>
                      ) : (
                        <span className="bg-red-600 px-6 py-1 text-white text-bold rounded-full inline-block">
                          不合格
                        </span>
                      )}
                      <span className="text-sm block mt-2">
                        合格ライン：スコア100%以上
                      </span>
                    </dd>
                  </dl>
                </li>
                <li className="border-b border-gray-300 pb-3 mb-3">
                  <dl className="flex flex-col md:flex-row md:items-center">
                    <dt className="w-44 font-bold mb-2 md:mb-0 md:mr-4">
                      スコア
                    </dt>
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
                {answeredQuestionsDetails.map((detail, index) => (
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
                        <dl className="table w-full border border-gray-300">
                          <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                            設問
                          </dt>
                          <dd className="table-cell p-4">{detail.question}</dd>
                        </dl>
                      </li>
                      <li className="bottom-1 border-black">
                        <dl className="table w-full border border-gray-300">
                          <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                            あなたの回答
                          </dt>
                          <dd className="table-cell p-4">
                            {detail.userAnswer}
                          </dd>
                        </dl>
                      </li>
                      <li className="bottom-1 border-black">
                        <dl className="table w-full border border-gray-300">
                          <dt className="table-cell w-1/6 bg-gray-100 font-bold p-4 border-r border-gray-300">
                            正答
                          </dt>
                          <dd className="table-cell p-4">
                            {detail.correctAnswer}
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-center flex-col">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-orange-400 hover:bg-orange-300 text-white rounded px-4 py-4 font-bold inline-block w-full md:w-96 mx-auto text-center cursor-pointer"
                >
                  もう一度挑戦する
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
