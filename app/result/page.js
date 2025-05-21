'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const [ment, setMent] = useState("");
  const [tier, setTier] = useState("");

  const imageMap = {
    0: "/result_images/result_0.png",
    1: "/result_images/result_1.png",
    2: "/result_images/result_2.png",
    3: "/result_images/result_3.png",
    4: "/result_images/result_4.png",
    5: "/result_images/result_5.png",
  };

  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("quizResult");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const correctCount = results.filter(r => r.isCorrect).length;
  const total = results.length;

  useEffect(() => {
    if (total === 0) return;

    if (correctCount === 0) {
      setMent("아직 AI랑 친해지려면 멀었어요. 시작이 반이에요!");
      setTier("당신은 입문자");
      setImageSrc(imageMap[0]);
    } else if (correctCount === 1) {
      setMent("조금 더 연습하면 감이 올 거예요!");
      setTier("당신은 연습생");
      setImageSrc(imageMap[1]);
    } else if (correctCount === 2) {
      setMent("반은 맞췄어요! 감이 잡히고 있어요.");
      setTier("당신은 관찰자");
      setImageSrc(imageMap[2]);
    } else if (correctCount === 3) {
      setMent("꽤나 잘하시네요! 눈썰미가 있으세요.");
      setTier("당신은 전문가");
      setImageSrc(imageMap[3]);
    } else if (correctCount === 4) {
      setMent("AI 감별력 거의 마스터급이에요!");
      setTier("당신은 AI 헌터");
      setImageSrc(imageMap[4]);
    } else if (correctCount === 5) {
      setMent("대단해요! AI도 속일 수 없네요.");
      setTier("당신은 AI 마스터");
      setImageSrc(imageMap[5]);
    }
  }, [correctCount, total]);

  return (
  <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 퀴즈 결과</h1>

      {nickname && (
        <p className="text-lg font-medium text-gray-700 mb-2">
          <span className="text-blue-600">{nickname}</span>님의 결과입니다!
        </p>
      )}

      <p className="text-gray-600 mb-4 text-sm">
        총 정답 수: <span className="font-semibold text-gray-800">{correctCount} / {total}</span>
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-700 font-medium text-base mb-6">
        {tier} <br></br>
        {ment}
        { imageSrc && (
          <img
            src={imageSrc}
            alt="결과 이미지"
            className="mx-auto mt-4 w-full h-60 object-contain"
          />
        )}
      </div>

      <button
        onClick={() => location.href = '/'}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
      >
        다시 풀기
      </button>
    </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
        © 2025 AI Quiz. All rights reserved. (feat. Ax-one)
      </div>
  </main>
  );
}
