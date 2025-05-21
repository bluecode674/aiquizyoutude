'use client';

import { useRouter } from "next/navigation";
import {useState} from "react";

export default function Home() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  const handleStartQuiz = () => {
    router.push("/quiz?nickname=" + nickname);
  };

  return (
<main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">AI Quiz</h1>
        <p className="mt-4 text-base text-gray-600">
          진짜 고양이? AI가 만든 이미지?<br />
          5개의 사진을 보고 AI 감별력을 테스트해보세요!
        </p>
        <img
          src="start.png"
          alt="Quiz"
          className="mt-6 w-full h-100 object-contain rounded-md shadow-md"
        />
        <input
          type="text"
          className="mt-6 w-full p-3 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="별명을 입력하세요"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
        />

        <button
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
          onClick={handleStartQuiz}
        >
          퀴즈 시작하기
        </button>
      </div>
    </main>
  );
}
