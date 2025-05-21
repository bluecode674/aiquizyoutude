import { Suspense } from 'react';
import QuizClient from './QuizClient';

export const dynamic = 'force-dynamic';

export default function QuizPage() {
  return (
    <Suspense fallback={<div>로딩 중입니다...</div>}>
      <QuizClient />
    </Suspense>
  );
}
