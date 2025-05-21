'use client';
export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";



export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizData = [
    {
      imageUrl: "/quiz_images/cat1.png",
      question: "이 이미지는 AI가 만든 것일까요?",
      options: ["AI가 만든 이미지", "실제 사진"],
      answer: 0,
    },
    {
      imageUrl: "/quiz_images/cat2.png",
      question: "이 이미지는 AI가 만든 것일까요?",
      options: ["AI가 만든 이미지", "실제 사진"],
      answer: 0,
    },
    {
      imageUrl: "/quiz_images/cat3.png",
      question: "이 이미지는 AI가 만든 것일까요?",
      options: ["AI가 만든 이미지", "실제 사진"],
      answer: 0,
    },
    {
      imageUrl: "/quiz_images/cat4.jpg",
      question: "이 이미지는 AI가 만든 것일까요?",
      options: ["AI가 만든 이미지", "실제 사진"],
      answer: 1,
    },
    {
      imageUrl: "/quiz_images/cat5.png",
      question: "이 이미지는 AI가 만든 것일까요?",
      options: ["AI가 만든 이미지", "실제 사진"],
      answer: 0,
    },
  ];

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      alert("답변을 선택해주세요.");
      return;
    }

    const isCorrect = selectedOption === quizData[quizIndex].answer;
    const currentResult = {
      question: quizData[quizIndex].question,
      userAnswer: selectedOption,
      correctAnswer: quizData[quizIndex].answer,
      isCorrect,
    };

    const updatedResults = [...results, currentResult];
    setResults(updatedResults);

    if (quizIndex < quizData.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true); // 이후 useEffect에서 처리
    }
  };

  useEffect(() => {
    if (quizFinished) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("quizResult", JSON.stringify(results));
      }
      router.push("/result?nickname=" + nickname);
    }
  }, [quizFinished]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-gray-800">AI 이미지 퀴즈</h1>
            <p className="mt-3 text-sm text-gray-600">
            이 사진은 진짜일까요, AI가 만든 이미지일까요?<br/>
            지금 바로 당신의 감별력을 테스트해보세요!
            </p>

            <p className="mt-4 text-base font-medium text-gray-700">안녕하세요, <span className="text-blue-600">{nickname}</span>님!</p>
            <p className="text-sm text-gray-500 mb-4">퀴즈 {quizIndex + 1} / {quizData.length}</p>

            <img
            src={quizData[quizIndex].imageUrl}
            alt="Quiz"
            className="w-full h-60 object-contain rounded-md border"
            />

            <p className="mt-4 text-lg font-semibold text-gray-800">{quizData[quizIndex].question}</p>

            <div className="mt-4 text-left space-y-2">
            {quizData[quizIndex].options.map((option, index) => (
                <label key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="radio"
                    name="quiz-option"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => handleOptionChange(index)}
                    className="accent-blue-500"
                />
                {option}
                </label>
            ))}
            </div>

            <button
            className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            onClick={handleNextQuestion}
            >
            {quizIndex < quizData.length - 1 ? "다음 질문" : "퀴즈 끝내기"}
            </button>
        </div>
        </main>

    );
}
